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

    const inList = new MyListService(movie.id).findMovie()

    // if (hoverItem !== index) return <span></span>

    return(
      <span>
        <div className="poster-controls">
          <MovieInfo movie={movie} hoverItem={hoverItem} index={index} />

          <PosterButtons
            inList={inList}
            movieId={movie.id}
            liked={liked}
            toggleVolume={this.toggleVolume}
            likeMovie={this.likeMovie}
            unlikeMovie={this.unlikeMovie}
            toggleMyList={this.toggleMyList}
          />
        </div>
      </span>
    )
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
    const target = event.target

    if (!target.classList.contains('fa')) return

    const parent = target.parentNode.parentNode
    const volume = parent.previousSibling
    const unlike = parent.nextSibling
    const liked = this.state.liked

    target.style.transform = 'scale(1.1)'
    unlike.style.transform = ''

    if (liked === null) {
      this.setState({
        liked: true
      })

      target.classList.remove('fa-thumbs-o-up')
      target.classList.add('fa-thumbs-up')

      volume.classList.add('move-down')
      parent.classList.add('move-down')
      
    } else {  
      target.classList.remove('fa-thumbs-up')
      target.classList.add('fa-thumbs-o-up')

      volume.classList.remove('move-down')
      volume.classList.add('move-up')

      parent.classList.remove('move-down')
      parent.classList.add('move-up')

      setTimeout(() => {
        this.setState({
          liked: null
        })
      }, 900)

      setTimeout(() => {
        volume.classList.remove('move-up')
        parent.classList.remove('move-up')
      }, 1500)
    }
  }

  unlikeMovie = (event) => {
    const target = event.target

    if (!target.classList.contains('fa')) return

    const parent = target.parentNode.parentNode
    const likeBtn = parent.previousSibling
    const volume = likeBtn.previousSibling
    
    const liked = this.state.liked

    target.style.transform = 'scale(1.1)'
    likeBtn.style.transform = ''

    if (liked === null) {
      this.setState({
        liked: false
      })

      target.classList.remove('fa-thumbs-o-down')
      target.classList.add('fa-thumbs-down')

      volume.classList.add('move-down')
    
    } else {
      target.classList.remove('fa-thumbs-down')
      target.classList.add('fa-thumbs-o-down')

      volume.classList.remove('move-down')
      volume.classList.add('move-up')

      setTimeout(() => {
        this.setState({
          liked: null
        })
      }, 900)

      setTimeout(() => {
        volume.classList.remove('move-up')
      }, 1500)
    }
  }

  toggleMyList = (event, movieId) => {
    const list = event.target.classList

    if (list.contains('fa-plus')) {
      list.remove('fa-plus')
      list.add('fa-check')
      return new MyListService(movieId).add()

    } else {
      list.remove('fa-check')
      list.add('fa-plus')
      return new MyListService(movieId).remove()
    }
  }

  addToList = (movieId) => {
    return new MyListService(movieId).add()
  }

  removeFromList = (movieId) => {
    return new MyListService(movieId).remove()
  }
}
