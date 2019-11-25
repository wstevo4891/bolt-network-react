// app/javascript/main/components/Navbar/components/Hamburger.jsx

import React from 'react'

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
    <span className="fa fa-bars"></span>
  </button>
)

export default Hamburger
