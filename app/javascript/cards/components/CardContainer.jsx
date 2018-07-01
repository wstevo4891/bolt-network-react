// app/javascript/cards/components/CardContainer.jsx

import React, { Component } from 'react'
import TransitionGroup from 'react-transition-group/TransitionGroup'

import Card from './Card'

class CardContainer extends Component {
  state = {
    card: this.props.card,
    showCard: this.props.card.show
  }

  componentWillReceiveProps(nextProps) {
    const card = nextProps.card

    this.setState({
      card: card,
      showCard: card.show
    })

    if (card.show === false) {
      card.show = true 

      setTimeout(() => {
        this.setState({
          card: card,
          showCard: card.show
        })
      }, 300)
    }
  }

  render() {
    const show = this.state.showCard
    const card = this.state.card

    return (
      <TransitionGroup>
        { show &&
            <Card
              card={card}
              index={this.props.index}
              hideCard={this.hideCard}
              removeCard={this.props.removeCard}
            /> }
      </TransitionGroup>
    )
  }

  componentDidMount() {
    const card = this.state.card
    card.show = true

    this.setState({
      card: card,
      showCard: true
    })
  }

  hideCard = () => {
    this.setState({
      showCard: false
    })
  }
}

export default CardContainer
