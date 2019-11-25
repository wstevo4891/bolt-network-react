import React, { Component } from 'react';

export default class MainContainer extends Component {
  state = {
    slideLength: null
  }

  slideLengthIndex = {
    1400: 6,
    1100: 5,
    800: 4,
    500: 3
  }

  breakpoints = [1400, 1100, 800, 500]

  render() {
    const slideLength = this.state.slideLength

    if (slideLength === null) return null

    return (
      <div id="main-container">
        {this.props.children(slideLength)}
      </div>
    )
  }

  componentDidMount() {
    if (this.state.slideLength === null) {
      this.updateSlideLength()
    }

    window.addEventListener("resize", this.updateSlideLength.bind(this))
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateSlideLength.bind(this))
  }

  updateSlideLength = () => {
    const newLength = this.findSlideLength()

    if (newLength === this.state.slideLength) return

    this.setState({
      slideLength: newLength
    })
  }

  findSlideLength = () => {
    const width = window.innerWidth
    let slideLength = null

    for (let point of this.breakpoints) {
      if (width >= point) {
        slideLength = this.slideLengthIndex[point]
        break
      }
    }

    return slideLength === null ? 2 : slideLength
  }
}
