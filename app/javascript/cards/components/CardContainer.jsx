// app/javascript/cards/components/CardContainer.jsx

import React, { Component } from 'react'
import TransitionGroup from 'react-transition-group/TransitionGroup'

import Card from './Card'

class CardContainer extends Component {
  state = {
    card: this.props.card,
    showCard: this.props.card.show
  }

  render() {
    const show = this.state.showCard
    const card = this.state.card

    return (
      <TransitionGroup>
        { show && <Card card={card} onRemove={this.removeCard} /> }
      </TransitionGroup>
    )
  }

  componentDidMount() {
    this.setState({
      showCard: true
    })
  }

  removeCard = () => {
    this.setState({
      showCard: false
    })
  }
}

export default CardContainer
