// app/javascript/main/components/Navbar/components/Hamburger.jsx

import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

const Hamburger = (props) => (
  <button
    className="navbar-toggler"
    type="button"
    data-toggle="collapse"
    data-target={`#${props.dataTarget}`}
    aria-controls={props.dataTarget}
    aria-expanded="false"
    aria-label="Menu Button"
    onClick={props.handleClick}
  >
    <FontAwesomeIcon icon={faBars} />
  </button>
)

export default Hamburger
