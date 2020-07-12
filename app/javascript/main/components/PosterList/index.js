// Poster List Component

import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Services
import PosterDataFactory from '@services/PosterDataFactory'

// Components
import Poster from './components/Poster'

class PosterList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hoverItem: null
    }

    this._mounted = false

    this.handleMouseLeave = this.handleMouseLeave.bind(this)
    this.handleMouseOver = this.handleMouseOver.bind(this)
  }

  render() {
    const dataFactory = new PosterDataFactory({...this.state, ...this.props })

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

  handleMouseOver(event) {
    let mouseOut = false
    const target = event.target.closest('.poster-container')

    target.onmouseout = () => mouseOut = true

    setTimeout(() => {
      if (mouseOut) return

      const slideIndex = parseInt(target.classList[1].slice(-1), 10)

      this._mounted && this.setState({ hoverItem: slideIndex })
    }, 500)
  }

  handleMouseLeave() {
    this._mounted && this.setState({ hoverItem: null })
  }

  componentDidMount() {
    this._mounted = true
  }

  componentWillUnmount() {
    this._mounted = false
  }
}

PosterList.propTypes = {
  movies: PropTypes.array.isRequired
}

export default PosterList
