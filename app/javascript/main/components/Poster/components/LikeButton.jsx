// app/javascript/main/scenes/components/LikeButton.jsx

import React from 'react'

const buttonClass = (liked) => {
  if (liked === null) {
    return 'poster-btn poster-btn-like static'
  
  } else if (liked === true) {
    return 'poster-btn poster-btn-like move-down-selected'

  } else if (liked === false) {
    return 'poster-btn poster-btn-like hidden'
  }
}

const iconClass = (liked) => {
  if (liked) {
    return 'fa fa-thumbs-up'
  } else {
    return 'fa fa-thumbs-o-up'
  }
}

const LikeButton = ({ liked, toggleLike }) => (
  <li className={buttonClass(liked)}>
    <button onClick={toggleLike}>
      <i className={iconClass(liked)}></i>
    </button>
  </li>
)

export default LikeButton
