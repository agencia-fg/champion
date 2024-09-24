import React from 'react'
import { Link } from 'vtex.render-runtime'
import { useDevice } from 'vtex.device-detector'

import { ConditionalLink } from '../types'

const ConditionalLink: StorefrontFC<ConditionalLink> = ({
  children,
  href,
  ...props
}) => {
  const { isMobile } = useDevice()

  if (isMobile) {
    return <div {...props}>{children}</div>
  }

  return (
    <Link to={href} {...props}>
      {children}
    </Link>
  )
}

export default ConditionalLink
