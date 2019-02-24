// app/javascript/navbar/containers/NavCollapse.jsx

import React, { Component } from 'react'

import API from '../../main_two/API'
import NavItem from '../components/NavItem'
import Dropdown from '../components/Dropdown'
import SearchBar from '../components/SearchBar'

export default class NavCollapse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genres: this.props.genres,
      active: 'home'
    }
  }

  render() {
    const { genres } = this.state
    const location = window.location.pathname

    return(
      <div className="collapse navbar-collapse" id="navbarContent">
        <ul className="navbar-nav mr-auto">
          <NavItem active={true} srOnly="(current)" href="/" text="Home" />

          <Dropdown id="genresDropdown" text="Genres" links={genres} />

          <NavItem active={false} href="/recent" text="Recently Added" />

          <NavItem active={false} href="/my-list" text="My List" />
        </ul>

        <ul className="navbar-nav navbar-right">
          <SearchBar location={location} />
        </ul>
      </div>
    )
  }
}
