// src/components/Poster/components/UnlikeButton.jsx

import React from 'react'

const buttonClass = (liked) => {
  if (liked === false) {
    return 'poster-btn poster-btn-unlike selected'
  
  } else if (liked === true) {
    return 'poster-btn poster-btn-unlike hidden'

  } else {
    return 'poster-btn poster-btn-unlike'
  }
}

const iconClass = (liked) => {
  if (liked === false) {
    return 'fa fa-thumbs-down'
  } else {
    return 'fa fa-thumbs-o-down'
  }
}

const UnlikeButton = ({ liked, toggleUnlike }) => (
  <li className={buttonClass(liked)}>
    <button onClick={toggleUnlike}>
      <i className={iconClass(liked)}></i>
    </button>
  </li>
)

export default UnlikeButton
