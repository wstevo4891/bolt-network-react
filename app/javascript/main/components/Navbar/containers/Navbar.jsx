// app/javascript/main/components/Navbar/containers/Navbar.jsx

import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'

// Components
import NavCollapse from './NavCollapse'
import SideMenu from './SideMenu'
import Hamburger from '../components/Hamburger'
import SearchInput from '../components/SearchInput'

export default class Navbar extends Component {
  state = {
    displayMobile: false,
    displayMenu: false
  }

  componentWillReceiveProps(nextProps) {
    const width = window.innerWidth

    if (width < 768) {
      this.addShadow()
      window.removeEventListener('scroll', this.handleScroll)
    } else {
      this.removeShadow()
      window.addEventListener('scroll', this.handleScroll)
    }
  }

  render() {
    const { displayMobile, displayMenu } = this.state

    return (
      <div id="navbar">
        <nav className="navbar navbar-expand-md fixed-top">
          <Hamburger dataTarget="navbarContent" onClickHandler={this.toggleDisplay} />

          <Link className="navbar-brand" to="/">
            <img src="/bolt-network.svg" alt="Bolt Network logo" className="logo" />
          </Link>

          <Route
            render={(routeProps) => <NavCollapse {...this.props} {...routeProps} />}
          />

          <Route
            render={(routeProps) => (
              <div id="mobileSearchInput">
                <div className="form-inline">
                  <SearchInput
                    location={routeProps.location}
                    history={routeProps.history}
                    placeholder="Search"
                  />
                </div>
              </div>
            )}
          />

          <Route
            render={(routeProps) => (
              <SideMenu
                genres={this.props.genres}
                display={displayMenu}
                {...routeProps}
              />
            )}
          />
        </nav>
      </div>
    )
  }

  toggleDisplay = () => {
    const displayMenu = this.state.displayMenu

    if (displayMenu) {
      this.setState({
        displayMenu: false
      })
    } else {
      this.setState({
        displayMenu: true
      })
    }
  }

  componentDidMount() {
    const width = window.innerWidth

    if (width < 768) {
      this.addShadow()
      window.removeEventListener('scroll', this.handleScroll)

    } else {
      this.removeShadow()
      window.addEventListener('scroll', this.handleScroll)
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
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
