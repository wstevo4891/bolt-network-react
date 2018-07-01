// app/javascript/cards/components/Card.jsx

import React, { Component } from 'react'
import TweenMax from 'gsap/TweenMax'

class Card extends Component {
  state = {
    card: this.props.card
  }

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
    const card = this.state.card

    return (
      <div className="cardApp_card" ref={c => this.container = c}>
        {card.content}
        <button onClick={() => this.props.onRemove()}>Remove</button>
      </div>
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

export default Card
