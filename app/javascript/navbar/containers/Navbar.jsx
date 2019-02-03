// app/javascript/navbar/containers/Navbar.jsx

import React, { Component } from 'react'

import Hamburger from '../components/Hamburger'
import NavCollapse from './NavCollapse'

export default class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      genres: null,
      moviesIndex: null,
      background: 'clear',
      slideLength: null
    };

    this.slideLengthIndex = {
      1400: 6,
      1100: 5,
      800: 4,
      500: 3
    };

    this.breakpoints = [1400, 1100, 800, 500];
  }

  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <a className="navbar-brand" href="/">
          <img src="bolt-network.svg" alt="Bolt Network logo" className="logo" />
        </a>

        <Hamburger dataTarget="navbarContent" />

        <NavCollapse />
      </nav>
    )
  }
}
