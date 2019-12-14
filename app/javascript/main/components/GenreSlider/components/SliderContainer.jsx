// app/javascript/main/scenes/Home/GenreSliders/components/SliderContent.jsx

import React, { Component } from 'react'

// Services
import ContainerStyle from '../services/ContainerStyle'
// import SliderPosterService from '../services/SliderPosterService'

// Components
import PosterFactory from '../../PosterFactory'

export default class SliderContainer extends Component {
  state = {
    hoverItem: null
  }

  _mounted = false

  render() {
    const { slides, slideLength, start, next, prev } = this.props

    const containerClass = this.containerClass(next, prev)
    
    const containerStyle = new ContainerStyle(this.props).call()

    return(
      <div className="slider-container">
        <div className={containerClass} style={containerStyle}>
          <PosterFactory
            type="slider"
            movies={slides}
            slideLength={slideLength}
            start={start}
            hoverItem={this.state.hoverItem}
            mouseOver={this.handleMouseOver}
            mouseLeave={this.handleMouseLeave}
          />
        </div>
      </div>
    )
  }

  containerClass = (next, prev) => {
    if (next || prev) {
      return "sliderContent animating"
    } else {
      return "sliderContent"
    }
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
