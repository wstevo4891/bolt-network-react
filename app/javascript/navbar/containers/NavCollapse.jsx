// app/javascript/navbar/containers/NavCollapse.jsx

import React, { Component } from 'react'

import NavItem from '../components/NavItem'
import Dropdown from '../components/Dropdown'
import SearchBar from '../components/SearchBar'
import SearchBarTwo from '../components/SearchBarTwo'

export default class NavCollapse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      links: [],
      active: 'home'
    }
  }

  render() {
    return(
      <div className="collapse navbar-collapse" id="navbarContent">
        <ul className="navbar-nav mr-auto">
          <NavItem active={true} srOnly="(current)" href="/" text="Home" />

          <NavItem active={false} href="/quotes" text="Quotes" />

          <NavItem active={false} href="/blog" text="Blog" />

          <Dropdown text="Dropdown" />

          <NavItem active={false} disabled={true} href="#" text="Disabled" />
        </ul>

        <ul className="navbar-nav navbar-right">
          <SearchBarTwo />
        </ul>

        {/* <SearchBar /> */}
      </div>
    )
  }
}
