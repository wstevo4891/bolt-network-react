// app/javascript/main/components/Navbar/containers/NavCollapse.jsx

import React, { Component } from 'react'

// Services
import API from '../../../services/API'

// Components
import NavItem from '../components/NavItem'
import Dropdown from '../components/Dropdown'
import SearchBar from './SearchBar'

export default class NavCollapse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genres: this.props.genres,
      path: this.props.location.pathname,
      history: this.props.history
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      path: nextProps.location.pathname,
      history: nextProps.history
    })
  }

  render() {
    const { genres, path, history } = this.state

    return(
      <div className="collapse navbar-collapse" id="navbarContent">
        <ul className="navbar-nav mr-auto">
          <NavItem
            id="home-link"
            path={path}
            href="/"
            text="Home"
          />

          <Dropdown
            id="genre-link"
            dropdownId="genresDropdown"
            path={path}
            text="Genres"
            links={genres}
          />

          <NavItem
            id="recent-link"
            path={path}
            href="/recent"
            text="Recently Added"
          />

          <NavItem
            id="my-list-link"
            path={path}
            href="/my-list"
            text="My List"
          />
        </ul>

        <ul className="navbar-nav navbar-right">
          <SearchBar location={path} history={history} />
        </ul>
      </div>
    )
  }
}
