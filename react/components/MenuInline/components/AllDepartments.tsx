import React, { useState } from 'react'
import type { FC } from 'react'
import { useDevice } from 'vtex.device-detector'
import { Link } from 'vtex.render-runtime'
import { Icon } from 'vtex.store-icons'

import type { IMenuItem } from '../index'
import MenuItem from './MenuItem'
import style from '../styles.css'
import MenuTitle from './MenuTitle'

const AllDepartments: FC<any> = ({
  categoryTree,
  currentOpenMenu,
  setCurrentOpenMenu,
}) => {
  const { isMobile } = useDevice()

  const [desktopCurrentMenu, setDesktopCurrentMenu] = useState<string | null>(
    null
  )

  return (
    <div
      className={`${style.AllDepartments} ${
        isMobile ? 'bb pb4 mb4 b--muted-3 ph6' : ''
      }`}
    >
      {isMobile ? (
        <h2 className={`${style.MenuLevel1} mb4`}>
          <span className="c-emphasis">Todos os departamentos</span>
          {currentOpenMenu}
        </h2>
      ) : (
        <button
          className={`${style.AllDepartmentsButton} justify-center nowrap mr0 flex items-center`}
        >
          <div className="flex flex-shrink-0">
            <Icon id="mpa-bars" size={10} />
          </div>
          <span className="ml3">Todos os departamentos</span>
        </button>
      )}
      <div className={!isMobile ? style.AllDepartmentsContent : ''}>
        {categoryTree?.map((item: IMenuItem) => (
          <div
            key={item.slug}
            onMouseEnter={() =>
              !isMobile &&
              item.children.length > 0 &&
              setDesktopCurrentMenu(item.slug)
            }
            onMouseLeave={() => !isMobile && setDesktopCurrentMenu(null)}
          >
            <MenuItem
              className={style.MenuLevel1}
              href={item.href}
              showCaret={item.children.length > 0}
              hasSub={item.children.length > 0}
              onClick={() => setCurrentOpenMenu(item.slug)}
            >
              {item.name}
            </MenuItem>
            {!isMobile && desktopCurrentMenu === item.slug && (
              <div className={style.AllDepartments__ContentDesktop}>
                <div className="pb2 mb5 bb b--muted-3">
                  <MenuTitle name={item.name} href={item.href} />
                </div>
                <div className={style.MenuLevel2__grid}>
                  {item?.children?.map((child: IMenuItem) => (
                    <div style={{ breakInside: 'avoid' }} key={child.slug}>
                      <div className="mb3 fw7">
                        <Link to={child.href}>{child.name}</Link>
                      </div>
                      {child.children.length > 0 &&
                        child.children.map((grandChild: IMenuItem) => (
                          <div className="mb3" key={grandChild.slug}>
                            <Link to={grandChild.href} className="f7">
                              {grandChild.name}
                            </Link>
                          </div>
                        ))}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllDepartments
