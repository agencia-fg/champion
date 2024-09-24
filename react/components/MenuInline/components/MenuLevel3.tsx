import React from 'react'

import style from '../styles.css'
import type { IMenuItem } from '../index'
import MenuItem from './MenuItem'

const MenuLevel3: StorefrontFC = ({ items }) => {
  return (
    <div>
      {items.map((subItem: IMenuItem) => (
        <>
          <div>
            <MenuItem className={style.MenuLevel3__Item} href={subItem.href}>
              <h3>{subItem.name}</h3>
            </MenuItem>
          </div>
        </>
      ))}
    </div>
  )
}

export default MenuLevel3
