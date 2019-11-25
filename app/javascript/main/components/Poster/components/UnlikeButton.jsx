// src/components/Poster/components/UnlikeButton.jsx

import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsDown  } from '@fortawesome/free-solid-svg-icons'

const UnlikeButton = ({liked, movie, toggleUnlike }) => {

  const buttonClass = () => {
    if (liked === false) {
      return 'poster-btn poster-btn-unlike selected'
    
    } else if (liked === true) {
      return 'poster-btn poster-btn-unlike hidden'

    } else {
      return 'poster-btn poster-btn-unlike'
    }
  }

  return(
    <li className={buttonClass()}>
      <button onClick={() => toggleUnlike(liked, movie)}>
        <FontAwesomeIcon icon={faThumbsDown} />
      </button>
    </li>
  )
}

export default UnlikeButton
