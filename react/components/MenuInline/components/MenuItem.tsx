import React from 'react'
import { useDevice } from 'vtex.device-detector'
import { Icon } from 'vtex.store-icons'
import { Link } from 'vtex.render-runtime'

import style from '../styles.css'

const MenuItem: StorefrontFC = ({
  children,
  href,
  hasSub,
  className,
  showCaret,
  ...props
}) => {
  const { isMobile } = useDevice()

  const classes = `${style.MenuItem} ${className || ''}`

  if (!isMobile) {
    return (
      <Link className={classes} to={href}>
        {showCaret ? (
          <div className="flex items-center justify-between">
            <h2>{children}</h2>
            <div className="ml2 c-muted-2 flex">
              <Icon id="nav-caret--right" size={10} />
            </div>
          </div>
        ) : (
          <h2>{children}</h2>
        )}
      </Link>
    )
  }

  if (isMobile && !hasSub) {
    return (
      <Link className={classes} to={href}>
        {children}
      </Link>
    )
  }

  return (
    <button {...props} className={classes}>
      {children}
      <div className="ml2 c-muted-2 flex">
        <Icon id="nav-caret--right" size={10} />
      </div>
    </button>
  )
}

export default MenuItem
