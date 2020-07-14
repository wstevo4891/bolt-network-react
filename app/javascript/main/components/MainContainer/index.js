import React, { Component } from 'react'

const BREAKPOINTS = [1400, 1100, 800, 500]

const SLIDE_LENGTH_INDEX = {
  1400: 6,
  1100: 5,
  800: 4,
  500: 3,
}

export default class MainContainer extends Component {
  state = {
    slideLength: null
  }

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
    this.updateSlideLength()

    window.addEventListener("resize", this.updateSlideLength.bind(this))
  }

  // TODO: deBounce this function
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

    for (let point of BREAKPOINTS) {
      if (width >= point) {
        slideLength = SLIDE_LENGTH_INDEX[point]
        break
      }
    }

    return slideLength || 2
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateSlideLength.bind(this))
  }
}
