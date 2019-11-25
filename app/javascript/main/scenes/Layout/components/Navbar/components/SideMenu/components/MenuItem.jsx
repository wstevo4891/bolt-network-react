// app/javascript/main/components/Navbar/components/NavItem.jsx

import React from 'react'
import { Link } from 'react-router-dom'

const MenuItem = (props) => {
  const itemClass = props.path === props.href ? 'nav-item active' : 'nav-item'
  const linkClass = props.disabled ? 'nav-link disabled' : 'nav-link'

  const srOnlyText = () => {
    if (props.path === props.href) {
      return "(current)"
    } else {
      return props.text
    }
  }

  return (
    <li className={itemClass} onClick={props.handleClick}>
      <Link
        id={props.id}
        className={linkClass}
        to={props.href}
      >
        {props.text}&nbsp;
        <span className="sr-only">
          {srOnlyText()}
        </span>
      </Link>
    </li>
  )
}

export default MenuItem
