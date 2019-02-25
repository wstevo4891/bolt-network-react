// app/javascript/main/components/Navbar/components/Dropdown.jsx

import React from 'react'
import { Link } from 'react-router-dom'

const Dropdown = (props) => {
  let itemClass
  if (props.active === props.id) {
    itemClass = "nav-item dropdown active"
  } else {
    itemClass = "nav-item dropdown"
  }

  return(
    <li id={props.id} className={itemClass}>
      <a
        className="nav-link dropdown-toggle"
        href="#"
        id={props.dropdownId}
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {props.text}
      </a>
      <div className="dropdown-menu" aria-labelledby={props.dropdownId}>
        {
          props.links.map((link, index) =>
            <Link
              key={index}
              id={`genre-link-${index}`}
              className="dropdown-item"
              to={link.url}
              onClick={props.handleClick}
            >
              {link.name}
            </Link>
          )
        }
      </div>
    </li>
  )
}

export default Dropdown
