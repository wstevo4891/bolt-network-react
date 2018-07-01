// app/javascript/animations/components/Page.jsx

import React, { Component } from 'react'
import TransitionGroup from 'react-transition-group/TransitionGroup'

import Box from './Box'

class Page extends Component {
  state = {
    shouldShowBox: true
  }

  render() {
    return (
      <div className="box_app">
        <TransitionGroup>
          { this.state.shouldShowBox && <Box /> }
        </TransitionGroup>

        <button
          className="toggle-btn"
          onClick={this.toggleBox}
        >
          Toggle
        </button>
      </div>
    )
  }

  toggleBox = () => {
    this.setState({
      shouldShowBox: !this.state.shouldShowBox
    })
  }
}

export default Page
