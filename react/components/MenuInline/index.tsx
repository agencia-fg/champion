import type { FC } from 'react'
import React, { useState } from 'react'
import { useDevice } from 'vtex.device-detector'
import { useQuery } from 'react-apollo'
import { canUseDOM } from 'vtex.render-runtime'
import { Container } from 'vtex.store-components'

import Skeleton from './components/Skeleton'
import AllDepartments from './components/AllDepartments'
import MenuLevel2 from './components/MenuLevel2'
import StaticMenu from './components/StaticMenu'
import MenuItem from './components/MenuItem'
import CATEGORY_TREE_QUERY from './queries/CustomMenuData.gql'
import style from './styles.css'

interface Props {
  showCategoryTree: boolean
  showAllDepartments: boolean
  staticItems: MenuItemStatic[]
}

export interface MenuItemStatic {
  name?: string
  href?: string
  newTab: boolean
  highlight: boolean
  itemType: string
  categoryId?: string
}

export interface IMenuItem {
  name: string
  href: string
  id: number
  children: IMenuItem[]
  slug: string
  hasChildren?: boolean
}

const MenuInline: StorefrontFC<Props> = ({
  showCategoryTree,
  showAllDepartments,
  staticItems,
}) => {
  const { isMobile } = useDevice()
  const [currentOpenMenu, setCurrentOpenMenu] = useState<string | null>(null)

  if (!canUseDOM) {
    return null
  }

  const { loading, error, data: categoryTree } = useQuery(CATEGORY_TREE_QUERY)

  const categories = categoryTree?.categories

  const CategoryTreeWrapper: FC = ({ children }) => {
    return isMobile ? (
      <div className="ph6 pb3 mb3 bb b--muted-3">{children}</div>
    ) : (
      <> {children} </>
    )
  }

  if (!canUseDOM || loading) {
    return <Skeleton isMobile={isMobile} />
  }

  if (error) {
    return <MenuItem>Erro ao exibir menu!</MenuItem>
  }

  return (
    <Container>
      <div
        className={` ${style.MenuContainer} ${
          isMobile
            ? `${style['MenuContainer--mobile']}`
            : `${style['MenuContainer--desktop']} flex items-center`
        }
          ${!isMobile && !showAllDepartments ? 'flex justify-center' : ''}`}
      >
        {showAllDepartments && (
          <AllDepartments
            categoryTree={categories}
            currentOpenMenu={currentOpenMenu}
            setCurrentOpenMenu={setCurrentOpenMenu}
          />
        )}
        {showCategoryTree && (
          <CategoryTreeWrapper>
            {categories.map((category: IMenuItem) => (
              <div
                key={category.href}
                onMouseEnter={() =>
                  !isMobile && setCurrentOpenMenu(category.href)
                }
                onMouseLeave={() => !isMobile && setCurrentOpenMenu(null)}
              >
                {category.hasChildren ? (
                  <>
                    <MenuItem
                      className={style.MenuLevel1}
                      hasSub={true}
                      href={isMobile ? null : category.href}
                      onClick={() => setCurrentOpenMenu(category.href)}
                    >
                      {category.name}
                    </MenuItem>
                    <MenuLevel2
                      parent={category}
                      currentOpenMenu={currentOpenMenu}
                      setCurrentOpenMenu={setCurrentOpenMenu}
                      open={currentOpenMenu === category.href}
                      items={category.children}
                    />
                  </>
                ) : (
                  <MenuItem className={style.MenuLevel1} href={category.href}>
                    {category.name}
                  </MenuItem>
                )}
              </div>
            ))}
          </CategoryTreeWrapper>
        )}
        {staticItems?.length > 0 && (
          <StaticMenu
            currentOpenMenu={currentOpenMenu}
            setCurrentOpenMenu={setCurrentOpenMenu}
            items={staticItems}
            categoryTree={categories}
          />
        )}
      </div>
    </Container>
  )
}

MenuInline.defaultProps = {
  showCategoryTree: true,
  showAllDepartments: false,
}

MenuInline.schema = {
  type: 'object',
  title: 'Menu Inline',
  properties: {
    showAllDepartments: {
      title: 'Exibir Todos os Departamentos?',
      type: 'boolean',
      default: false,
    },
    showCategoryTree: {
      title: 'Exibir árvore de categoria?',
      type: 'boolean',
      default: true,
    },
    staticItems: {
      title: 'Itens estáticos',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          __editorItemTitle: {
            title: 'admin/editor.menu.item.editorItemTitle.title',
            description: 'admin/editor.menu.item.editorItemTitle.description',
            type: 'string',
          },
          itemType: {
            title: 'Tipo',
            type: 'string',
            enum: ['Link', 'Category'],
            default: 'Link',
          },

          highlight: {
            type: 'boolean',
            title: 'Destaque?',
          },
          newTab: {
            type: 'boolean',
            title: 'Abrir em Nova Aba?',
          },
        },
        dependencies: {
          itemType: {
            oneOf: [
              {
                properties: {
                  itemType: {
                    enum: ['Category'],
                  },
                  categoryId: {
                    title: 'Id da Categoria',
                    type: 'string',
                  },
                },
              },
              {
                properties: {
                  itemType: {
                    enum: ['Link'],
                  },
                  name: {
                    type: 'string',
                    title: 'Texto',
                  },
                  href: {
                    type: 'string',
                    title: 'URL',
                  },
                },
              },
            ],
          },
        },
      },
    },
  },
}

export default MenuInline
