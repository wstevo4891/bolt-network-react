// app/javascript/cards/components/Board.js

import React from 'react'

import CardContainer from './CardContainer'

const Board = (props) => {
  const cards = props.cards

  if (cards.length > 0) {
    return (
      <ul className="cardApp_board">
        {
          cards.map(card =>
            <li className="cardApp_board__item" key={card.id}>
              <CardContainer
                card={card}
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

export default Board
