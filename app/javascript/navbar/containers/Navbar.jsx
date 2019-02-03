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
      <nav className="navbar navbar-expand-md fixed-top">
        <a className="navbar-brand" href="/">
          <img src="bolt-network.svg" alt="Bolt Network logo" className="logo" />
        </a>

        <Hamburger dataTarget="navbarContent" />

        <NavCollapse />
      </nav>
    )
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    const scrollLength = window.scrollY

    if (scrollLength > 20) {
      this.addShadow()
    } else {
      this.removeShadow()
    }
  }

  removeShadow = () => {
    document.querySelector('.navbar').classList.remove('nav-shadow')
  }

  addShadow = () => {
    document.querySelector('.navbar').classList.add('nav-shadow')
  }
}
