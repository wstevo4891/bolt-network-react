// app/javascript/main/components/Navbar/components/NavItem.jsx

import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

import ScreenReaderText from './ScreenReaderText'

const MenuItem = (props) => {
  const itemClass = props.path === props.href ? 'nav-item active' : 'nav-item'
  const linkClass = props.disabled ? 'nav-link disabled' : 'nav-link'

  return (
    <li className={itemClass} onClick={props.handleClick}>
      <Link
        id={props.id}
        className={linkClass}
        to={props.href}
      >
        {props.text}&nbsp;
        <ScreenReaderText
          href={props.href}
          path={props.path}
          text={props.text}
        />
      </Link>
    </li>
  )
}

MenuItem.propTypes = {
  disabled: PropTypes.bool,
  handleClick: PropTypes.func,
  href: PropTypes.string,
  id: PropTypes.string,
  path: PropTypes.string,
  text: PropTypes.string,
}

export default MenuItem
