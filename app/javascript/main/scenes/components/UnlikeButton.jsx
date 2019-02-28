// app/javascript/main/scenes/components/UnlikeButton.jsx

import React, { Component } from 'react'

import UnlikeButtonService from '../services/UnlikeButtonService'

export default class UnlikeButton extends Component {
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
      <li className={`poster-btn poster-btn-unlike${itemClass}`}>
        <button onClick={() => this.toggleUnlikeMovie(liked, movie)}>
          <i className={iconClass}></i>
        </button>
      </li>
    )
  }

  deterItemClass = (liked) => {
    if (liked === null) return ''

    if (liked === false) {
      return ' selected'
    
    } else if (liked === true) {
      return ' hidden'

    }
  }

  deterIconClass = (liked) => {
    if (liked === false) {
      return 'fa fa-thumbs-down'
    } else {
      return 'fa fa-thumbs-o-down'
    }
  }

  toggleUnlikeMovie = (liked, movie) => {
    if (liked === false) {
      new UnlikeButtonService(movie).remove()

    } else if (liked === null) {
      new UnlikeButtonService(movie).add()
    }

    this.props.toggleUnlike()
  }
}