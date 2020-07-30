// app/javascript/main/scenes/components/PosterControls.jsx

import React, { Component } from 'react'

// Services
import SessionListInterface from '@services/SessionListInterface'

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

const LIKED_LIST = 'LikedList'

const UNLIKED_LIST = 'UnlikedList'

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

    if (SessionListInterface.findMovie(movie, LIKED_LIST)) return true

    if (SessionListInterface.findMovie(movie, UNLIKED_LIST)) return false

    return null
  }
}
