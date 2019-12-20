// Poster List Component

import React, { Component } from 'react'

import PosterDataFactory from '../../services/PosterDataFactory'

import Poster from './components/Poster'

export default class PosterList extends Component {
  state = {
    hoverItem: null
  }

  _mounted = false

  render() {
    const factoryParams = {...this.state, ...this.props }

    const dataFactory = new PosterDataFactory(factoryParams)

    return this.props.movies.map((movie, index) => {

      const posterData = dataFactory.build(movie, index)

      return(
        <Poster
          key={index}
          {...posterData}
          mouseOver={this.handleMouseOver}
          mouseLeave={this.handleMouseLeave}
        />
      )
    })
  }

  handleMouseOver = (event) => {
    let mouseOut = false
    const target = event.target.closest('.poster-container')
    const slideIndex = parseInt(target.classList[1].slice(-1), 10)

    target.onmouseout = () => mouseOut = true

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
