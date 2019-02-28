// app/javascript/main/scenes/components/LikeButton.jsx

import React, { Component } from 'react'

import LikeButtonService from '../services/LikeButtonService'

export default class LikeButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      liked: this.props.liked,
      movie: this.props.movie
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      liked: nextProps.liked
    })
  }

  render() {
    const { liked, movie } = this.state

    const itemClass = this.deterItemClass(liked)
    const iconClass = this.deterIconClass(liked)

    return(
      <li className={`poster-btn poster-btn-like ${itemClass}`}>
        <button onClick={() => this.toggleLikeMovie(liked, movie)}>
          <i className={iconClass}></i>
        </button>
      </li>
    )
  }

  deterItemClass = (liked) => {
    if (liked === null) {
      return 'static'
    
    } else if (liked === true) {
      return 'move-down-selected'

    } else if (liked === false) {
      return 'hidden'
    }
  }

  deterIconClass = (liked) => {
    if (liked) {
      return 'fa fa-thumbs-up'
    } else {
      return 'fa fa-thumbs-o-up'
    }
  }

  toggleLikeMovie = (liked, movie) => {
    if (liked) {
      new LikeButtonService(movie).remove()

    } else {
      new LikeButtonService(movie).add()
    }

    this.props.toggleLike()
  }
}
