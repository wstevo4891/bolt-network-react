// app/javascript/main/components/Navbar/containers/SideMenu.jsx

import React, { Component } from 'react'

// Components
import NavItem from '../components/NavItem'

export default class SideMenu extends Component {
  state = {
    genres: this.props.genres,
    path: this.props.location.pathname,
    display: this.props.display
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.state.path) {
      setTimeout(() => {
        this.props.toggleDisplay()
      }, 1000)
    }

    this.setState({
      path: nextProps.location.pathname,
      display: nextProps.display
    })
  }

  render() {
    const width = window.innerWidth

    if (width > 767) return null

    const { genres, path, display } = this.state

    let contStyle
    if (display === false) {
      contStyle = { transform: 'translate3d(-9rem, 0px, 0px)' }
    } else {
      contStyle = { transform: 'translate3d(0px, 0px, 0px)' }
    }

    return(
      <div id="side-menu" style={contStyle}>
        <ul className="navbar-nav">
          <NavItem
            id="home-link"
            path={path}
            href="/"
            text="Home"
          />

          <NavItem
            id="my-list-link"
            path={path}
            href="/my-list"
            text="My List"
          />

          <NavItem
            id="recent-link"
            path={path}
            href="/recent"
            text="Recently Added"
          />

          {genres.map((genre, index) =>
            <NavItem
              key={index}
              id={`genre-link-${index}`}
              path={path}
              href={genre.url}
              text={genre.name}
            />
          )}
        </ul>
      </div>
    )
  }
}

