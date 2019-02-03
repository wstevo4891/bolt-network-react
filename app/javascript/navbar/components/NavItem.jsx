// app/javascript/navbar/components/NavItem.jsx

import React from 'react'

const NavItem = (props) => {
  const itemClass = props.active ? 'nav-item active' : 'nav-item'
  const linkClass = props.disabled ? 'nav-link disabled' : 'nav-link'

  if (props.srOnly) {
    return (
      <li className={itemClass} >
        <a className={linkClass} href={props.href}>
          {props.text} <span className="sr-only">{props.srOnly}</span>
        </a>
      </li>
    )
  } else {
    return (
      <li className={itemClass} >
        <a className={linkClass} href={props.href} >
          {props.text}
        </a>
      </li>
    )
  }
}

export default NavItem
