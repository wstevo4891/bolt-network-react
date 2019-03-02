// app/javascript/main/components/Navbar/containers/Navbar.jsx

import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'

import Hamburger from '../components/Hamburger'
import NavCollapse from './NavCollapse'

export default class Navbar extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div id="navbar">
        <nav className="navbar navbar-expand-md fixed-top">
          <Link className="navbar-brand" to="/">
            <img src="/bolt-network.svg" alt="Bolt Network logo" className="logo" />
          </Link>

          <Hamburger dataTarget="navbarContent" />

          <Route
            render={(routeProps) => <NavCollapse {...this.props} {...routeProps} />}
          />
        </nav>
      </div>
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
