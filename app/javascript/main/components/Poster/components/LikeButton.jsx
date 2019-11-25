// app/javascript/main/scenes/components/LikeButton.jsx

import React, { Component } from 'react'

class LikeButton extends Component {
  render() {
    const { liked, movie, toggleLike } = this.props

    return(
      <li className={this.buttonClass(liked)}>
        <button onClick={() => toggleLike(liked, movie)}>
          <i className={this.iconClass(liked)}></i>
        </button>
      </li>
    )
  }

  buttonClass = (liked) => {
    if (liked === null) {
      return 'poster-btn poster-btn-like static'
    
    } else if (liked === true) {
      return 'poster-btn poster-btn-like move-down-selected'

    } else if (liked === false) {
      return 'poster-btn poster-btn-like hidden'
    }
  }

  iconClass = (liked) => {
    if (liked) {
      return 'fa fa-thumbs-up'
    } else {
      return 'fa fa-thumbs-o-up'
    }
  }
}

export default LikeButton
