// app/javascript/main/scenes/components/PosterRow.jsx

import React, { Component } from 'react'

import Poster from './Poster'
import StaticPosterService from '../services/StaticPosterService'

export default class PosterRow extends Component {
  constructor(props) {
    super(props)

    this.state = {
      movies: props.movies,
      slideLength: props.slideLength,
      hoverItem: null
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      movies: nextProps.movies,
      slideLength: nextProps.slideLength
    })
  }

  render() {
    const { movies, slideLength, hoverItem } = this.state

    if (movies.length === 0) return null

    return (
      <div className="sliderContent">
        {
          movies.map((movie, index) =>
            <Poster
              key={index}
              index={index}
              movie={movie}
              slideLength={slideLength}
              hoverItem={hoverItem}
              mouseOver={this.handleMouseOver}
              mouseLeave={this.handleMouseLeave}
              service={StaticPosterService}
            />
          )
        }
      </div>
    );
  }

  handleMouseOver = (event) => {
    let mouseOut = false
    const target = event.target.closest('.poster-container')
    const slideIndex = parseInt(target.classList[1].slice(-1), 10)

    target.onmouseout = () => {
      mouseOut = true
    }
    
    setTimeout(() => {
      if (mouseOut) return

      this.setState({
        hoverItem: slideIndex
      })
    }, 500)
  }

  handleMouseLeave = () => {
    this.setState({
      hoverItem: null
    })
  }
}
