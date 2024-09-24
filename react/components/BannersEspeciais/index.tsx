import React from 'react'
import { useListContext, ListContextProvider } from 'vtex.list-context'
import { Image } from 'vtex.store-image'
import { Link } from 'vtex.render-runtime'

interface Props {
  items: PropsBannersEspeciaisItem[]
  children: any
}
interface PropsBannersEspeciaisItem {
  text: string
  title: string
  image: string
  link: string
  newTab: boolean
  textAlign: string
}

const defineTextAlign = (textAlign: string) => {
  if (textAlign === 'left') {
    return 'tl'
  }

  if (textAlign === 'right') {
    return 'tr'
  }

  return ''
}

const BannersEspeciais: StorefrontFC<Props> = (props: Props) => {
  const { list } = useListContext() || []

  if (props.items.length > 0) {
    const listContent = props.items.map(
      ({ title, text, image, link, newTab, textAlign }, index) => (
        <Link
          to={link || '#'}
          target={newTab ? '_blank' : '_self'}
          key={`tb-${index}`}
          className="db"
        >
          {image && (
            <div className="flex items-center justify-center mb4">
              <Image src={image} className="db" />
            </div>
          )}
          <div className={textAlign ? defineTextAlign(textAlign) : 'tc'}>
            <div>
              <h4 className="fw4 f5">{title}</h4>
            </div>
            <div>
              <h3>{text}</h3>
            </div>
          </div>
        </Link>
      )
    )

    const newListContextValue = list.concat(listContent)

    return (
      <div>
        <ListContextProvider list={newListContextValue}>
          {props.children}
        </ListContextProvider>
      </div>
    )
  }

  return <div />
}

BannersEspeciais.schema = {
  title: 'Banners Especiais',
  type: 'object',
  properties: {
    items: {
      title: 'Itens',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          __editorItemTitle: {
            title: 'admin/editor.menu.item.editorItemTitle.title',
            description: 'admin/editor.menu.item.editorItemTitle.description',
            type: 'string',
          },
          title: {
            type: 'string',
            title: 'Titulo',
            widget: {
              'ui:widget': 'textarea',
            },
          },
          text: {
            type: 'string',
            title: 'Texto',
            widget: {
              'ui:widget': 'textarea',
            },
          },
          image: {
            type: 'string',
            title: 'Imagem',
            widget: {
              'ui:widget': 'image-uploader',
            },
          },
          link: {
            type: 'string',
            title: 'Link',
          },
          newTab: {
            type: 'boolean',
            title: 'Abrir em nova guia?',
          },
        },
      },
    },
  },
}

export default BannersEspeciais
