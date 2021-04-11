// Dependencies
import React, { Component } from 'react'

// Services
import SessionListAPI from '@services/SessionListAPI'

// Components
import ButtonsList from './ButtonsList'
import MovieInfo from './MovieInfo'

// Constants
import {
  LIKED_LIST,
  STATUS_MAP,
  UNLIKED_LIST,
} from './constants'

export default class PosterControls extends Component {
  constructor(props) {
    super(props)
    this.state = {
      likeState: undefined
    }
  }

  render() {
    const { likeState } = this.state

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

    if (SessionListAPI.findMovie(movie, LIKED_LIST)) return true

    if (SessionListAPI.findMovie(movie, UNLIKED_LIST)) return false

    return null
  }
}
