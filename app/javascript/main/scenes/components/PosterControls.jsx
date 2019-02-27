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

    const inList = this.findMovie(movie.id)

    // if (hoverItem !== index) return <span></span>

    return(
      <span>
        <div className="poster-controls">
          <MovieInfo movie={movie} hoverItem={hoverItem} index={index} />

          <PosterButtons
            inList={inList}
            movieId={movie.id}
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
    const list = event.target.classList

    if (list.contains('fa-volume-up')) {
      list.remove('fa-volume-up')
      list.add('fa-times')
    } else {
      list.remove('fa-times')
      list.add('fa-volume-up')
    }
  }

  likeMovie = (event) => {
    const list = event.target.classList
    list.remove('fa-thumbs-o-up')
    list.add('fa-thumbs-up')

    const unlikeBtn = event.target.parentNode.parentNode.nextSibling
    unlikeBtn.classList.add('hidden')

    this.setState({
      liked: true
    })
  }

  unlikeMovie = (event) => {
    const list = event.target.classList
    list.remove('fa-thumbs-o-down')
    list.add('fa-thumbs-down')

    const likeBtn = event.target.parentNode.parentNode.previousSibling
    likeBtn.classList.add('hidden')

    this.setState({
      liked: false
    })
  }

  findMovie = (movieId) => {
    return new MyListService(movieId).findMovie()
  }

  toggleMyList = (event, movieId) => {
    const list = event.target.classList

    if (list.contains('fa-plus')) {
      list.remove('fa-plus')
      list.add('fa-check')
      this.addToList(movieId)

    } else {
      list.remove('fa-check')
      list.add('fa-plus')
      this.removeFromList(movieId)
    }
  }

  addToList = (movieId) => {
    return new MyListService(movieId).add()
  }

  removeFromList = (movieId) => {
    return new MyListService(movieId).remove()
  }
}
