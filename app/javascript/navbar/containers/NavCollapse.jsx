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
      genres: [],
      active: 'home'
    }
  }

  render() {
    const { genres } = this.state

    return(
      <div className="collapse navbar-collapse" id="navbarContent">
        <ul className="navbar-nav mr-auto">
          <NavItem active={true} srOnly="(current)" href="/" text="Home" />

          <Dropdown id="genresDropdown" text="Genres" links={genres} />

          <NavItem active={false} href="/recent" text="Recently Added" />

          <NavItem active={false} href="/my-list" text="My List" />
        </ul>

        <ul className="navbar-nav navbar-right">
          <SearchBar {...this.props} />
        </ul>
      </div>
    )
  }

  componentDidMount() {
    this.fetchGenres()
  }

  fetchGenres() {
    API.genres.index()
      .then(response => {
        // localStorage.setItem('Genres', JSON.stringify(response.data));

        this.setState({
          genres: response.data
        });
      })
      .catch(error => {
        console.error(error);
      })
  }
}
