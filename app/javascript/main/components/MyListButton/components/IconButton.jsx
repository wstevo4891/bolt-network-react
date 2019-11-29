// MyList IconButton

import React from 'react'

const IconButton = (props) => (
  <li className="poster-btn poster-btn-my-list">
    <button onClick={props.handleClick}>
      <i className={props.iconClass}></i>
    </button>
  </li>
)

export default IconButton
