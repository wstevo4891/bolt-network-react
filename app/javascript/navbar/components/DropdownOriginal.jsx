// app/javascript/navbar/components/Dropdown.jsx

import React from 'react'

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
            <a
              key={index}
              className="dropdown-item"
              href={link.url}
            >
              {link.name}
            </a>
          )
        }
        {/* <a className="dropdown-item" href="#">Action</a>
        <a className="dropdown-item" href="#">Another action</a>
        <div className="dropdown-divider"></div>
        <a className="dropdown-item" href="#">Something else here</a> */}
      </div>
    </li>
  )
}

export default Dropdown
