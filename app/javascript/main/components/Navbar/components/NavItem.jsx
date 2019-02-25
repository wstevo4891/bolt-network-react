// app/javascript/main/components/Navbar/components/NavItem.jsx

import React from 'react'
import { Link } from 'react-router-dom'

const NavItem = (props) => {
  const itemClass = props.active === props.id ? 'nav-item active' : 'nav-item'
  const linkClass = props.disabled ? 'nav-link disabled' : 'nav-link'

  if (props.srOnly) {
    return (
      <li className={itemClass}>
        <Link
          id={props.id}
          className={linkClass}
          to={props.href}
          onClick={props.handleClick}
        >
          {props.text} <span className="sr-only">{props.srOnly}</span>
        </Link>
      </li>
    )
  } else {
    return (
      <li className={itemClass}>
        <Link
          id={props.id}
          className={linkClass}
          to={props.href}
          onClick={props.handleClick}
        >
          {props.text}
        </Link>
      </li>
    )
  }
}

export default NavItem
