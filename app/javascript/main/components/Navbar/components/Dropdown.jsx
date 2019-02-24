// app/javascript/main/components/Navbar/components/Dropdown.jsx

import React from 'react'
import { Link } from 'react-router-dom'

const Dropdown = (props) => {
  return(
    <li className="nav-item dropdown">
      <a
        className="nav-link dropdown-toggle"
        href="#"
        id={props.id}
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {props.text}
      </a>
      <div className="dropdown-menu" aria-labelledby={props.id}>
        {
          props.links.map((link, index) =>
            <Link
              key={index}
              className="dropdown-item"
              to={link.url}
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
