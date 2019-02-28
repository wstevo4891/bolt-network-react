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
import MyListButton from './MyListButton'

export default class PosterControls extends Component {
  constructor(props) {
    super(props)
    this.state = {
      index: this.props.index,
      hoverItem: this.props.hoverItem,
      movie: this.props.movie,
      liked: undefined
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.hoverItem === this.state.hoverItem) return

    this.setState({
      index: nextProps.index,
      hoverItem: nextProps.hoverItem,
      movie: nextProps.movie
    })
  }

  render() {
    const { index, hoverItem, movie, liked } = this.state

    if (hoverItem !== index) return <span></span>

    if (liked === undefined) return null

    return(
      <span>
        <div className="poster-controls">
          <MovieInfo movie={movie} hoverItem={hoverItem} index={index} />

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

            <MyListButton movieId={movie.id} />
          </ul>
        </div>
      </span>
    )
  }

  componentDidMount() {
    const movie = this.state.movie

    const foundLike = new LikeButtonService(movie).findMovie()
    const foundUnlike = new UnlikeButtonService(movie).findMovie()

    if (foundLike === false && foundUnlike === false) {
      this.setState({
        liked: null
      })
    } else if (foundLike === true) {
      this.setState({
        liked: true
      })
    } else if (foundUnlike === true) {
      this.setState({
        liked: false
      })
    }
  }

  toggleLike = () => {
    const liked = this.state.liked

    if (liked) {
      this.setState({
        liked: null
      })
    } else {
      this.setState({
        liked: true
      })
    }
  }

  toggleUnlike = () => {
    const liked = this.state.liked

    if (liked === null) {
      this.setState({
        liked: false
      })
    } else if (liked === false) {
      this.setState({
        liked: null
      })
    }
  }
}
