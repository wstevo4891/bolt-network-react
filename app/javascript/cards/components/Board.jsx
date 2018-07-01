// app/javascript/cards/components/Board.js

import React, { Component } from 'react'

import CardContainer from './CardContainer'

class Board extends Component {
  state = {
    cards: this.props.cards
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      cards: nextProps.cards
    })
  }

  render() {
    const cards = this.state.cards

    if (cards.length > 0) {
      return (
        <ul className="cardApp_board">
          {
            cards.map((card, index) =>
              <li className="cardApp_board__item" key={index}>
                <CardContainer
                  card={card}
                  index={index}
                  removeCard={this.props.removeCard}
                />
              </li>
            )
          }
        </ul>
      )
    } else {
      return null
    }
  }
}

export default Board
