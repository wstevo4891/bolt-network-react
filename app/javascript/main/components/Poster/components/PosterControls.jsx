// app/javascript/main/scenes/components/PosterControls.jsx

import React, { Component } from 'react'

// Services
import LikeButtonService from '../services/LikeButtonService'
import UnlikeButtonService from '../services/UnlikeButtonService'

// Components
import MovieInfo from './MovieInfo'

// Poster Buttons
import VolumeButton from './VolumeButton'
import LikeButton from './LikeButton'
import UnlikeButton from './UnlikeButton'
import MyListButton from '../../MyListButton'

export default class PosterControls extends Component {
  state = {
    liked: undefined
  }

  render() {
    const liked = this.state.liked
    if (liked === undefined) return null
    
    const { slideItem, hoverItem, movie } = this.props

    if (hoverItem !== slideItem) return <span></span>

    return(
      <span>
        <div className="poster-controls">
          <MovieInfo movie={movie} hoverItem={hoverItem} />

          <ul className="poster-buttons">
            <VolumeButton liked={liked} />

            <LikeButton
              liked={liked}
              movie={movie}
              toggleLike={this.toggleLike}
            />

            <UnlikeButton
              liked={liked}
              movie={movie}
              toggleUnlike={this.toggleUnlike}
            />

            <MyListButton movie={movie} type="icon" />
          </ul>
        </div>
      </span>
    )
  }

  componentDidMount() {
    const movie = this.props.movie
    const foundLike = new LikeButtonService(movie).findMovie()
    const foundUnlike = new UnlikeButtonService(movie).findMovie()

    this.setState({
      liked: this.determineLike(foundLike, foundUnlike)
    })
  }

  determineLike = (like, unlike) => {
    if (like === true) {
      return true

    } else if (unlike === true) {
      return false

    } else {
      return null
    }
  }

  toggleLike = (likeState, movie) => {
    if (likeState === true) {
      new LikeButtonService(movie).remove()

      this.setState({
        liked: null
      })

    } else {
      new LikeButtonService(movie).add()

      this.setState({
        liked: true
      })
    }
  }

  toggleUnlike = (likeState, movie) => {
    if (likeState === false) {
      new UnlikeButtonService(movie).remove()

      this.setState({
        liked: null
      })

    } else {
      new UnlikeButtonService(movie).add()

      this.setState({
        liked: false
      })
    }
  }
}
