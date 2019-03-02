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
      dropdownShow: false
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      path: nextProps.location.pathname
    })
  }

  render() {
    const { genres, path, dropdownShow } = this.state
    const location = window.location.pathname

    return(
      <div className="collapse navbar-collapse" id="navbarContent">
        <ul className="navbar-nav mr-auto">
          <NavItem
            id="home-link"
            path={path}
            srOnly="(current)"
            href="/"
            text="Home"
            handleClick={this.handleClick}
          />

          <Dropdown
            id="genre-link"
            dropdownId="genresDropdown"
            path={path}
            text="Genres"
            links={genres}
            dropdownShow={dropdownShow}
            handleClick={this.handleClick}
          />

          <NavItem
            id="recent-link"
            path={path}
            href="/recent"
            text="Recently Added"
            handleClick={this.handleClick}
          />

          <NavItem
            id="my-list-link"
            path={path}
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

  handleClick = (targetId) => {
    this.setState({
      dropdownShow: false
    })
  }
}
