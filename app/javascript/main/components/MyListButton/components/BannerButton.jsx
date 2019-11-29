// MyList BannerButton

import React from 'react'

const BannerButton = (props) => (
  <button
    className="btn-clear"
    onClick={props.handleClick}
  >
    <i className={props.iconClass}></i>MY LIST
  </button>
)

export default BannerButton
