import React from 'react'

interface IProps {
  visible: boolean
}

const OptionalBlock: StorefrontFC<IProps> = ({ visible, children }) => {
  if (!visible) {
    return null
  }

  return <>{children}</>
}

OptionalBlock.defaultProps = {
  visible: true,
}

OptionalBlock.schema = {
  type: 'object',
  title: 'Componente Opcional',
  properties: {
    visible: {
      type: 'boolean',
      title: 'Ativo',
      default: true,
    },
  },
}

export default OptionalBlock
