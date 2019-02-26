// app/javascript/main/scenes/components/PosterControls.jsx

import React, { Component } from 'react'

import MyListService from '../services/MyListService'
import MovieInfo from './MovieInfo'
import PosterButtons from './PosterButtons'

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

  render() {
    const { index, hoverItem, movie, liked } = this.state

    // if (props.hoverItem !== props.index) return <span></span>

    return(
      <span>
        <div className="poster-controls">
          <MovieInfo movie={movie} hoverItem={hoverItem} index={index} />

          <PosterButtons
            toggleVolume={this.toggleVolume}
            likeMovie={this.likeMovie}
            unlikeMovie={this.unlikeMovie}
            toggleMyList={this.toggleMyList}
          />
        </div>
      </span>
    )
  }

  componentDidMount() {

  }

  toggleVolume = (event) => {

  }

  likeMovie = (event) => {
    this.setState({
      liked: true
    })
  }

  unlikeMovie = (event) => {
    this.setState({
      liked: false
    })
  }

  toggleMyList = (event) => {

  }

  addToList = (movieId) => {
    return new MyListService(movieId).add()
  }

  removeFromList = (movieId) => {
    return new MyListService(movieId).remove()
  }
}
