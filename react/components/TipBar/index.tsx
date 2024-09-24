import React from 'react'
import { useListContext, ListContextProvider } from 'vtex.list-context'
import { index as RichText } from 'vtex.rich-text'
import type { CssHandlesTypes } from 'vtex.css-handles'
import { useCssHandles } from 'vtex.css-handles'
import { Image } from 'vtex.store-image'
import './style.css'

const CSS_HANDLES = ['tipBar', 'tipBarItem', 'tipBarIcon'] as const

interface Props {
  items: PropsTipBarItem[]
  children: any
  classes?: CssHandlesTypes.CustomClasses<typeof CSS_HANDLES>
}
interface PropsTipBarItem {
  text: string
  icon: string
}

const TipBar: StorefrontFC<Props> = (props: Props) => {
  const { list } = useListContext() || []

  const { handles } = useCssHandles(CSS_HANDLES, {
    classes: props.classes,
  })

  if (props.items.length > 0) {
    const listContent = props.items.map(({ text, icon }, index) => (
      <div className="flex items-center justify-center" key={`tb-${index}`}>
        {icon && (
          <div
            className={`mr3 flex items-center justify-center ${handles.tipBarIcon}`}
          >
            <Image src={icon} className={handles.tipBarIcon} />
          </div>
        )}
        <RichText text={text} />
      </div>
    ))

    const newListContextValue = list.concat(listContent)

    return (
      <div className={`${handles.tipBar} TipBar`}>
        <ListContextProvider list={newListContextValue}>
          {props.children}
        </ListContextProvider>
      </div>
    )
  }

  return <div />
}

TipBar.schema = {
  title: 'Itens da Tip Bar',
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
          text: {
            type: 'string',
            title: 'Texto',
            widget: {
              'ui:widget': 'textarea',
            },
          },
          icon: {
            type: 'string',
            title: 'Ícone',
            widget: {
              'ui:widget': 'image-uploader',
            },
          },
        },
      },
    },
  },
}

export default TipBar
