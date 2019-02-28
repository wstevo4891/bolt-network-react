// app/javascript/main/scenes/components/PosterControls.jsx

import React, { Component } from 'react'

// Services
import MyListService from '../services/MyListService'

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
      liked: null
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

    const inList = new MyListService(movie.id).findMovie()

    // if (hoverItem !== index) return <span></span>

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
