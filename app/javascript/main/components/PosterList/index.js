// Dependencies
import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Utils
import { SLIDER, STATIC } from '@utils'

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
    const { slideLength, start, type, name } = this.props

    const { hoverItem } = this.state

    const factoryProps = { hoverItem, slideLength, start, type }

    return this.props.movies.map((movie, index) => {
      const posterData = PosterDataFactory(movie, index, factoryProps)

      const posterKey = `${name}_Poster_${movie.id}`

      return(
        <Poster
          key={posterKey}
          mouseLeave={this.handleMouseLeave}
          mouseOver={this.handleMouseOver}
          {...posterData}
        />
      )
    })
  }

  handleMouseOver(event, slideItem) {
    let mouseOut = false
    const target = event.target.closest('.poster-container')

    target.onmouseout = () => mouseOut = true

    setTimeout(() => {
      if (mouseOut) return

      this._mounted && this.setState({ hoverItem: slideItem })
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
  movies: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  slideLength: PropTypes.number.isRequired,
  type: PropTypes.oneOf([SLIDER, STATIC]).isRequired,
  start: PropTypes.bool,
}

PosterList.defaultProps = {
  start: null,
}

export default PosterList
