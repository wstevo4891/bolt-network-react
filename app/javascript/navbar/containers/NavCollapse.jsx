// app/javascript/navbar/containers/NavCollapse.jsx

import React, { Component } from 'react'

import NavItem from '../components/NavItem'
import Dropdown from '../components/Dropdown'

export default class NavCollapse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      links: [],
      active: 'home'
    }
  }

  render() {
    return (
      <div className="collapse navbar-collapse" id="navbarContent">
        <ul className="navbar-nav mr-auto">
          <NavItem active={true} srOnly="(current)" href="/" text="Home" />

          <NavItem active={false} href="/quotes" text="Quotes" />

          <NavItem active={false} href="/blog" text="Blog" />

          <Dropdown text="Dropdown" />

          <NavItem active={false} disabled={true} href="#" text="Disabled" />
        </ul>

        <form className="form-inline my-2 my-lg-0" action="/search">
          <input className="form-control mr-sm-2" type="search" name="query" placeholder="Search" aria-label="Search"/>
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
    )
  }
}
