// app/javascript/navbar/containers/Navbar.jsx

import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Hamburger from '../components/Hamburger'
import NavCollapse from './NavCollapse'

export default class Navbar extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <nav className="navbar navbar-expand-md fixed-top">
        <Link className="navbar-brand" to="/">
          <img src="/bolt-network.svg" alt="Bolt Network logo" className="logo" />
        </Link>

        <Hamburger dataTarget="navbarContent" />

        <NavCollapse genres={this.props.genres} />
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
