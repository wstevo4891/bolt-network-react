// app/javascript/cards/components/Card.jsx

import React, { Component } from 'react'
import TweenMax from 'gsap/TweenMax'

class Card extends Component {
  state = {
    card: this.props.card,
    index: this.props.index
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
    const index = this.state.index

    return (
      <div className="cardApp_card" ref={c => this.container = c}>
        {card.content}
        <button onClick={() => this.handleClick(index)}>Remove</button>
      </div>
    )
  }

  handleClick = (index) => {
    this.props.hideCard()

    setTimeout(() => {
      this.props.removeCard(index)
    }, 300)
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
