// app/javascript/navbar/components/Hamburger.jsx

import React from 'react'

const Hamburger = (props) => (
  <button
    className="navbar-toggler"
    type="button"
    data-toggle="collapse"
    // data-target="#navbarContent"
    data-target={`#${props.dataTarget}`}
    // aria-controls="navbarContent"
    aria-controls={props.dataTarget}
    aria-expanded="false"
    aria-label="Toggle navigation"
  >
    <span className="navbar-toggler-icon"></span>
  </button>
)

export default Hamburger
