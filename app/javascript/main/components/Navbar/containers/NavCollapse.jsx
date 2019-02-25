// app/javascript/main/components/Navbar/containers/NavCollapse.jsx

import React, { Component } from 'react'

import API from '../../../services/API'
import NavItem from '../components/NavItem'
import Dropdown from '../components/Dropdown'
import SearchBar from './SearchBar'

export default class NavCollapse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genres: this.props.genres,
      active: 'home-link'
    }
  }

  render() {
    const { genres, active } = this.state
    const location = window.location.pathname

    return(
      <div className="collapse navbar-collapse" id="navbarContent">
        <ul className="navbar-nav mr-auto">
          <NavItem
            id="home-link"
            active={active}
            srOnly="(current)"
            href="/"
            text="Home"
            handleClick={this.handleClick}
          />

          <Dropdown
            id="genre-link"
            active={active}
            dropdownId="genresDropdown"
            text="Genres"
            links={genres}
            handleClick={this.handleClick}
          />

          <NavItem
            id="recent-link"
            active={active}
            href="/recent"
            text="Recently Added"
            handleClick={this.handleClick}
          />

          <NavItem
            id="my-list-link"
            active={active}
            href="/my-list"
            text="My List"
            handleClick={this.handleClick}
          />
        </ul>

        <ul className="navbar-nav navbar-right">
          <SearchBar location={location} />
        </ul>
      </div>
    )
  }

  handleClick = (event) => {
    const targetId = event.target.id

    if (targetId.match(/genre-link/)) {
      this.setState({
        active: 'genre-link'
      })
    } else {
      this.setState({
        active: targetId
      })
    }
  }
}
