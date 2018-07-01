// app/javascript/cards/components/App.jsx

import React, { Component } from 'react'

import Board from './Board'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      cards: []
    }

    this.addCard = this.addCard.bind(this)
    this.removeCard = this.removeCard.bind(this)
    this.removeLastCard = this.removeLastCard.bind(this)
  }

  render() {
    const cards = this.state.cards

    if (cards.length > 0) {
      return (
        <div className="container">
          <h1>React Transition Demo</h1>
          <button onClick={this.addCard}>Add a Card</button>
          <button onClick={this.removeLastCard}>Remove a Card</button>
  
          <Board cards={cards} />
        </div>
      )
    } else {
      return (
        <div className="container">
          <h1>React Transition Demo</h1>
          <button onClick={this.addCard}>Add a Card</button>
        </div>
      )
    }
  }

  addCard() {
    const cards = this.state.cards
    const id = cards.length + 1
    const newCard = {
      id: id,
      content: `Card ${id}`,
      show: false
    }
    cards.push(newCard)

    this.setState({
      cards: cards
    })
  }

  removeCard(id) {
    const cards = this.state.cards

    this.setState({
      cards: cards.filter(card => card.id !== id)
    })
  }

  removeLastCard() {
    const cards = this.state.cards
    cards.pop()

    this.setState({
      cards: cards
    })
  }

  componentDidUpdate() {
    console.log('App updated')
    console.log(this.state)
  }
}

export default App
