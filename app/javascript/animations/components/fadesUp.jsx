// app/javascript/animations/components/fadesUp.jsx

import React from 'react'
import ReactDOM from 'react-dom'
import TweenMax from 'gsap/TweenMax'

function fadesUp (Component) {
  return class FadesUp extends React.Component {
    componentWillEnter (callback) {
      const el = ReactDOM.findDOMNode(this)
      TweenMax.fromTo(
        el,
        0.3,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, onComplete: callback }
      )
    }

    render () {
      return (
        <Component ref="child" {...this.props} />
      )
    }

    componentWillLeave (callback) {
      const el = ReactDOM.findDOMNode(this)
      TweenMax.fromTo(
        el,
        0.3,
        { y: 0, opacity: 1 },
        { y: -100, opacity: 0, onComplete: callback }
      )
    }
  }
}

export default fadesUp
