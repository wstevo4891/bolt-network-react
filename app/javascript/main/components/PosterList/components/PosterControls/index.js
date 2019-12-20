// app/javascript/main/scenes/components/PosterControls.jsx

import React, { Component } from 'react'

// Services
import SessionList from '@services/SessionList'

// Components
import MovieInfo from './components/MovieInfo'
import ButtonsList from './components/ButtonsList'

function StatusMap(volume, like, unlike) {
  this.volume = volume || 'static'
  this.like = like || 'static'
  this.unlike = unlike || 'static'
}

export default class PosterControls extends Component {
  state = {
    likeState: undefined
  }

  render() {
    const likeState = this.state.likeState
    if (likeState === undefined) return null
    
    const { hoverItem, movie } = this.props

    const statusMap = this.setStatusMap(likeState)

    return(
      <span>
        <div className="poster-controls">
          <MovieInfo movie={movie} hoverItem={hoverItem} />

          <ButtonsList
            statusMap={statusMap}
            movie={movie}
            toggleLike={this.toggleLike}
            toggleUnlike={this.toggleUnlike}
          />
        </div>
      </span>
    )
  }

  setStatusMap(likeState) {
    if (likeState === null) {
      return new StatusMap()

    } else if (likeState === true) {
      return new StatusMap('move-down', 'move-down-selected', 'hidden')
    
    } else if (likeState === false) {
      return new StatusMap('move-down', 'hidden', 'selected')
    }
  }

  toggleLike = () => {
    this.setState({
      likeState: this.state.likeState ? null : true
    })
  }

  toggleUnlike = () => {
    this.setState({
      likeState: this.state.likeState === false ? null : false
    })
  }

  componentDidMount() {
    const currentLikeState = this.getLikeState()

    this.setState({
      likeState: currentLikeState
    })
  }

  getLikeState() {
    const movie = this.props.movie
    const likedList = new SessionList(movie, 'LikedList')
    const unlikedList = new SessionList(movie, 'UnlikedList')
  
    if (likedList.findMovie()) {
      return true
  
    } else if (unlikedList.findMovie()) {
      return false
  
    } else {
      return null
    }
  }
}
