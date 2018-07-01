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
    const buttonStyle = {
      marginRight: '1rem'
    }

    if (cards.length > 0) {
      return (
        <div className="container">
          <h1>React Transition Demo</h1>
          <button style={buttonStyle} onClick={this.addCard}>Add a Card</button>
          <button style={buttonStyle} onClick={this.removeLastCard}>Remove a Card</button>
  
          <Board cards={cards} removeCard={this.removeCard} />
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

  removeCard(index) {
    const cards = this.state.cards
    const nextCard = cards[index + 1]
    cards.splice(index, 2, nextCard)

    for (let i = index; i < cards.length; i++) {
      cards[i].id--
      cards[i].content = `Card ${i + 1}`
      cards[i].show = false
    }

    this.setState({
      cards: cards
    })
  }

  removeLastCard() {
    const cards = this.state.cards
    cards[cards.length - 1].show = false

    this.setState({
      cards: cards
    })

    setTimeout(() => {
      cards.pop()

      this.setState({
        cards: cards
      })
    }, 300)
  }

  componentDidUpdate() {
    console.log('App updated')
    console.log(this.state)
  }
}

export default App
