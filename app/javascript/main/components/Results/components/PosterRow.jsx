// app/javascript/main/scenes/components/PosterRow.jsx

import React, { Component } from 'react'

import PosterFactory from '../../PosterFactory'

export default class PosterRow extends Component {
  state = {
    hoverItem: null
  }

  _mounted = false

  render() {
    const { movies, slideLength } = this.props

    if (movies.length === 0) return null

    return(
      <div className="sliderContent">
        <PosterFactory
          type="static"
          movies={movies}
          slideLength={slideLength}
          hoverItem={this.state.hoverItem}
          mouseOver={this.handleMouseOver}
          mouseLeave={this.handleMouseLeave}
        />
      </div>
    )
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

      this._mounted && this.setState({
        hoverItem: slideIndex
      })
    }, 500)
  }

  handleMouseLeave = () => {
    this._mounted && this.setState({
      hoverItem: null
    })
  }

  componentDidMount() {
    this._mounted = true
  }

  componentWillUnmount() {
    this._mounted = false
  }
}
