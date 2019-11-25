// src/components/Poster/components/UnlikeButton.jsx

import React, { Component } from 'react'

class UnlikeButton extends Component {
  render() {
    const {liked, movie, toggleUnlike } = this.props

    return(
      <li className={this.buttonClass(liked)}>
        <button onClick={() => toggleUnlike(liked, movie)}>
          <i className={this.iconClass(liked)}></i>
        </button>
      </li>
    )
  }

  buttonClass = (liked) => {
    if (liked === false) {
      return 'poster-btn poster-btn-unlike selected'
    
    } else if (liked === true) {
      return 'poster-btn poster-btn-unlike hidden'

    } else {
      return 'poster-btn poster-btn-unlike'
    }
  }

  iconClass = (liked) => {
    if (liked === false) {
      return 'fa fa-thumbs-down'
    } else {
      return 'fa fa-thumbs-o-down'
    }
  }
}

export default UnlikeButton
