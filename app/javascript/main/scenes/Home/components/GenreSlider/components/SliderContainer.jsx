// app/javascript/main/scenes/Home/GenreSliders/components/SliderContent.jsx

import React, { Component } from 'react'

// Services
import ContainerStyle from '../services/ContainerStyle'
import SliderPosterService from '../services/SliderPosterService'

// Components
import Poster from '../../../../../components/Poster'

export default class SliderContainer extends Component {
  state = {
    hoverItem: null
  }

  _mounted = false

  render() {
    const { slides, slideLength, start, next, prev } = this.props

    const slideOver = new ContainerStyle(this.props).call()

    const container = this.containerClass(next, prev)

    return(
      <div className="slider-container">
        <div className={container} style={slideOver}>
          {
            slides.map((slide, index) =>
              <Poster
                key={index}
                index={index}
                movie={slide}
                slideLength={slideLength}
                start={start}
                next={next}
                prev={prev}
                hoverItem={this.state.hoverItem}
                mouseOver={this.handleMouseOver}
                mouseLeave={this.handleMouseLeave}
                service={SliderPosterService}
              />
            )
          }
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
