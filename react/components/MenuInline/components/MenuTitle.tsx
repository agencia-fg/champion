import React from 'react'
import { Link } from 'vtex.render-runtime'

import style from '../styles.css'

const MenuTitle: React.FC<{ name: string; href: string }> = ({
  name,
  href,
}) => (
  <div className={style.MenuTitle}>
    <h2 className={style.MenuTitleText}>{name}</h2>
    <Link className="db nowrap f6 underline-hover" to={href}>
      Ver tudo
    </Link>
  </div>
)

export default MenuTitle
