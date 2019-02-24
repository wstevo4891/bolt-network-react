// app/javascript/main_two/containers/Main.jsx

import React, { Component } from 'react'

import Navbar from '../../navbar/containers/Navbar'
import Routes from './Routes'

export default class Main extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const slideLength = this.props.slideLength

    return (
      <div id="main-container">
        <div id="navbar">
          <Navbar slideLength={slideLength} {...this.props} />
        </div>

        <Routes slideLength={slideLength} />
      </div>
    )
  }
}
