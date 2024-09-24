import type { FC } from 'react'
import React from 'react'
import { useDevice } from 'vtex.device-detector'

import type { MenuItemStatic } from '../index'
import MenuItem from './MenuItem'
import MenuLevel2 from './MenuLevel2'
import style from '../styles.css'

interface StaticMenu {
  categoryTree?: any[]
  items: MenuItemStatic[]
  currentOpenMenu: string | null

  setCurrentOpenMenu: (param: any) => void
}

interface CategoryItemProps {
  categoryId: string | undefined
}

const StaticMenu: StorefrontFC<StaticMenu> = ({
  categoryTree,
  items,
  currentOpenMenu,
  setCurrentOpenMenu,
}) => {
  const { isMobile } = useDevice()

  const CategoryItem: FC<CategoryItemProps> = ({ categoryId }) => {
    if (!categoryId) {
      return null
    }

    const categoryObject = categoryTree?.find(
      c => c.id.toString() === categoryId
    )

    if (!categoryObject) {
      return null
    }

    return (
      <div
        onMouseEnter={() =>
          !isMobile && setCurrentOpenMenu(categoryObject.slug)
        }
        onMouseLeave={() => !isMobile && setCurrentOpenMenu(null)}
      >
        {categoryObject.hasChildren ? (
          <>
            <MenuItem
              className={`${style.MenuLevel1}   ${
                categoryObject.highlight ? style['MenuLevel1--highlight'] : ''
              }`}
              hasSub={true}
              onClick={() => setCurrentOpenMenu(categoryObject.slug)}
            >
              {categoryObject.name}
            </MenuItem>
            <MenuLevel2
              parent={categoryObject}
              currentOpenMenu={currentOpenMenu}
              setCurrentOpenMenu={setCurrentOpenMenu}
              open={currentOpenMenu === categoryObject.slug}
              items={categoryObject.children}
            />
          </>
        ) : (
          <MenuItem className={style.MenuLevel1} href={categoryObject.href}>
            {categoryObject.name}
          </MenuItem>
        )}
      </div>
    )
  }

  return (
    <div className={` ${style.MenuStatic} ${isMobile ? 'ph6' : 'flex'}`}>
      {items.map((item: MenuItemStatic, index: number) => {
        return item.itemType === 'Link' ? (
          <MenuItem
            className={`${style.MenuLevel1} ${
              item.highlight ? style['MenuLevel1--highlight'] : ''
            }`}
            href={item.href}
            key={index}
          >
            <h2>{item.name}</h2>
          </MenuItem>
        ) : (
          <CategoryItem categoryId={item.categoryId} key={index} />
        )
      })}
    </div>
  )
}

export default StaticMenu
