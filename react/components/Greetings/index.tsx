import React from 'react'
import { index as RichText } from 'vtex.rich-text'
import { useRuntime } from 'vtex.render-runtime'

import style from './styles.css'

interface Props {
  example: string
  image: string
}

const ComponentName: StorefrontFC<Props> = ({ example, image }) => {
  const { deviceInfo } = useRuntime()

  return (
    <div className={`${style.myClass}`}>
      {deviceInfo.isMobile ? 'mobile' : 'not mobile'}
      <h2>componente test</h2>
      <h3
        style={{ backgroundColor: 'orange' }}
        className={`c-on-base--inverted f1 pa5 pv1 tr`}
      >
        {' '}
        {example}{' '}
      </h3>
      <RichText text={example} />
      <img src={image} />
    </div>
  )
}

ComponentName.defaultProps = {
  example: 'default prop value',
  image: 'https://picsum.photos/id/89/120/120',
}

ComponentName.schema = {
  type: 'object',
  title: 'Componente Customizado 2B',
  properties: {
    image: {
      type: 'string',
      title: 'Imagem',
      widget: {
        'ui:widget': 'image-uploader',
      },
    },
    example: {
      type: 'string',
      title: 'Exemplo',
    },
  },
}

export default ComponentName
