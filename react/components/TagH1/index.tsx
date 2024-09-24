import React from 'react'
import { useRuntime } from 'vtex.render-runtime'

interface Props {
  text: string
}

const TagH1: StorefrontFC<Props> = ({ text }) => {
  const { route } = useRuntime()

  if (text && route.id === "store.home") {
    return <h1 className='dn' >{text}</h1>
  }
  return <></>
}

TagH1.defaultProps = {
  text: '',
}

TagH1.schema = {
  type: 'object',
  title: 'Texto do H1',
  properties: {
    text: {
      type: 'string',
      title: 'Texto do H1',
    },
  },
}

export default TagH1
