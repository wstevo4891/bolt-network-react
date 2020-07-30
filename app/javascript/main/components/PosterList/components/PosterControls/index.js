// app/javascript/main/scenes/components/PosterControls.jsx

import React, { Component } from 'react'

// Services
import SessionList from '@services/SessionList'

// Components
import MovieInfo from './components/MovieInfo'
import ButtonsList from './components/ButtonsList'

const STATIC = 'static'

const MOVE_DOWN = 'move-down'

const HIDDEN = 'hidden'

const STATUS_MAP = {
  [null]: {
    volume: STATIC,
    like: STATIC,
    unlike: STATIC,
  },
  [true]: {
    volume: MOVE_DOWN,
    like: 'move-down-selected',
    unlike: HIDDEN,
  },
  [false]: {
    volume: MOVE_DOWN,
    like: HIDDEN,
    unlike: 'selected',
  },
}

export default class PosterControls extends Component {
  constructor(props) {
    super(props)
    this.state = {
      likeState: undefined
    }
  }

  render() {
    const likeState = this.state.likeState
    if (likeState === undefined) return null
    
    const { hoverItem, movie } = this.props

    const statusMap = STATUS_MAP[likeState]

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

  toggleLike = () => {
    this.setState(prevState => ({
      likeState: prevState.likeState ? null : true
    }))
  }

  toggleUnlike = () => {
    this.setState(prevState => ({
      likeState: prevState.likeState === false ? null : false
    }))
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
