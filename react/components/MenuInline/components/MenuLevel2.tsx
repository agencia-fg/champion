import React from 'react'
import { useDevice } from 'vtex.device-detector'
import { Container } from 'vtex.store-components'
import { Icon } from 'vtex.store-icons'

import MenuLevel3 from './MenuLevel3'
import MenuItem from './MenuItem'
import MenuTitle from './MenuTitle'
import style from '../styles.css'
import type { IMenuItem } from '../index'

interface Props {
  items: IMenuItem[]
  open: boolean
  currentOpenMenu: string | null
  parent: IMenuItem
  setCurrentOpenMenu: (param: any) => void
}

const MenuLevel2: StorefrontFC<Props> = ({
  items,
  open,
  parent,
  currentOpenMenu,
  setCurrentOpenMenu,
}) => {
  const { isMobile } = useDevice()

  const dropdownContainerClasses = `h-100 w-100 overflow-y-auto pv7 ph6 b--muted-3 ${
    !isMobile ? 'bb' : 'bt'
  }`

  const BackButton: React.FC<{ label: string; backTo: string | null }> = ({
    label,
    backTo,
  }) => (
    <button
      onClick={() => setCurrentOpenMenu(backTo)}
      className="ph5 pv6 w-100"
    >
      <Container>
        <div className="flex items-center w-100">
          <div className="mr2 c-muted-2 flex">
            <Icon id="nav-caret--left" size={10} />
          </div>
          <span
            className="overflow-hidden nowrap"
            style={{ textOverflow: 'ellipsis' }}
          >
            {label}
          </span>
        </div>
      </Container>
    </button>
  )

  return (
    <>
      {open && (
        <div
          className={`${style.MenuLevel2} ${
            isMobile ? style['MenuLevel2--mobile'] : ''
          } `}
        >
          {isMobile && <BackButton label={'Voltar'} backTo={null} />}

          <div className={dropdownContainerClasses}>
            <Container>
              <div className={`${!isMobile && style.MenuLevel2__grid}`}>
                {isMobile && (
                  <div className="mb6">
                    <MenuTitle name={parent.name} href={parent.href} />
                  </div>
                )}
                {items.map((item: IMenuItem) => (
                  <div className={`${style.MenuLevel2__gridItem}`}>
                    <MenuItem
                      className={style.MenuLevel2__title}
                      hasSub={item.children.length > 0}
                      href={item.href}
                      onClick={() =>
                        item.children.length > 0 &&
                        setCurrentOpenMenu(item.href)
                      }
                    >
                      {item.name}
                    </MenuItem>

                    {!isMobile && <MenuLevel3 items={item.children} />}
                  </div>
                ))}
              </div>
            </Container>
          </div>
        </div>
      )}

      {isMobile &&
        items.map((item: IMenuItem) => (
          <div>
            {currentOpenMenu === item.href && (
              <div
                className={`${style.MenuLevel2}  ${
                  isMobile ? style['MenuLevel2--mobile'] : ''
                } `}
              >
                <BackButton label={parent.name} backTo={parent.href} />

                <div className={dropdownContainerClasses}>
                  <Container>
                    <div className="mb6">
                      <MenuTitle name={item.name} href={item.href} />
                    </div>
                    <MenuLevel3 items={item.children} />
                  </Container>
                </div>
              </div>
            )}
          </div>
        ))}
    </>
  )
}

export default MenuLevel2
