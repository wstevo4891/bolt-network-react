// app/javascript/animations/components/Box.jsx

import React, { Component } from 'react'
import TweenMax from 'gsap/TweenMax'

class Box extends Component {
  componentWillEnter(callback) {
    const el = this.container
    TweenMax.fromTo(
      el,
      0.3,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, onComplete: callback }
    )
  }

  render() {
    return (
      <div className="box" ref={c => this.container = c} />
    )
  }

  componentWillLeave(callback) {
    const el = this.container
    TweenMax.fromTo(
      el,
      0.3,
      { y: 0, opacity: 1 },
      { y: -100, opacity: 0, onComplete: callback }
    )
  }
}

export default Box
