// app/javascript/main/scenes/components/LikeButton.jsx

import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp  } from '@fortawesome/free-solid-svg-icons'

const LikeButton = ({ liked, movie, toggleLike }) => {

  const buttonClass = () => {
    if (liked === null) {
      return 'poster-btn poster-btn-like static'
    
    } else if (liked === true) {
      return 'poster-btn poster-btn-like move-down-selected'

    } else if (liked === false) {
      return 'poster-btn poster-btn-like hidden'
    }
  }

  return(
    <li className={buttonClass()}>
      <button onClick={() => toggleLike(liked, movie)}>
        <FontAwesomeIcon icon={faThumbsUp} />
      </button>
    </li>
  )
}

export default LikeButton
