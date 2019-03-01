// app/javascript/main/App.jsx

import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import Main from './components/Main'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      slideLength: null
    }

    this.slideLengthIndex = {
      1400: 6,
      1100: 5,
      800: 4,
      500: 3
    }

    this.breakpoints = [1400, 1100, 800, 500]
  }

  render() {
    const slideLength = this.state.slideLength

    if (slideLength === null) return null

    return (
      <Router>
        <Main slideLength={slideLength} />
      </Router>
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
    let width = window.innerWidth
    let num = null

    for (let point of this.breakpoints) {
      if (width >= point) {
        num = this.slideLengthIndex[point]
        break
      }
    }

    if (num == null) {
      num = 2
    }

    this.setState({
      slideLength: num
    })
  }
}
