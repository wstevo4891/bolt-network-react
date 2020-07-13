import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'
import ScreenReaderText from './ScreenReaderText'

const NavItem = (props) => {
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

NavItem.propTypes = {
  href: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  handleClick: PropTypes.func,
}

NavItem.defaultProps = {
  disabled: false,
  handleClick: () => void {},
}

export default NavItem
