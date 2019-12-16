// app/javascript/main/scenes/components/PosterControls.jsx

import React, { Component } from 'react'

// Services
import SessionList from '../../../services/SessionList'

// Components
import MovieInfo from './MovieInfo'

// Poster Buttons
import VolumeButton from './VolumeButton'
import LikeButton from './LikeButton'
import UnlikeButton from './UnlikeButton'
import MyListButton from '../../MyListButton'

export default class PosterControls extends Component {
  state = {
    likedList: new SessionList(this.props.movie, 'LikedList'),
    unlikedList: new SessionList(this.props.movie, 'UnlikedList'),
    liked: undefined
  }

  render() {
    const liked = this.state.liked
    if (liked === undefined) return null
    
    const { hoverItem, movie } = this.props

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
              toggleUnlike={this.toggleUnlike}
            />

            <MyListButton movie={movie} type="icon" />
          </ul>
        </div>
      </span>
    )
  }

  componentDidMount() {
    const likeState = this.getLikeState()

    this.setState({
      liked: likeState
    })
  }

  getLikeState = () => {
    const { likedList, unlikedList } = this.state

    if (likedList.findMovie()) {
      return true

    } else if (unlikedList.findMovie()) {
      return false

    } else {
      return null
    }
  }

  toggleLike = () => {
    const { likedList, liked } = this.state

    if (liked === true) {
      likedList.remove()

      this.setState({
        liked: null
      })

    } else {
      likedList.add()

      this.setState({
        liked: true
      })
    }
  }

  toggleUnlike = () => {
    const { unlikedList, liked } = this.state

    if (liked === false) {
      unlikedList.remove()

      this.setState({
        liked: null
      })

    } else {
      unlikedList.add()

      this.setState({
        liked: false
      })
    }
  }
}
