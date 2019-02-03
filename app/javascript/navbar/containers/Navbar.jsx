// app/javascript/navbar/containers/Navbar.jsx

import React, { Component } from 'react'

import Hamburger from '../components/Hamburger'
import NavCollapse from './NavCollapse'

export default class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      genres: null,
      moviesIndex: null,
      background: 'clear',
      slideLength: null
    };

    this.slideLengthIndex = {
      1400: 6,
      1100: 5,
      800: 4,
      500: 3
    };

    this.breakpoints = [1400, 1100, 800, 500];
  }

  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <a className="navbar-brand" href="/">Bolt Network</a>
        <Hamburger dataTarget="navbarContent" />

        <NavCollapse />

        {/* <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/quotes">Quotes</a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/blog">Blog</a>
            </li>

            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle"
                 href="#"
                 id="navbarDropdown"
                 role="button"
                 data-toggle="dropdown"
                 aria-haspopup="true"
                 aria-expanded="false">
                Dropdown
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#">Action</a>
                <a className="dropdown-item" href="#">Another action</a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">Something else here</a>
              </div>
            </li>

            <li className="nav-item">
              <a className="nav-link disabled" href="#">Disabled</a>
            </li>
          </ul>

          <form className="form-inline my-2 my-lg-0" action="/search">
            <input className="form-control mr-sm-2" type="search" name="query" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div> */}
      </nav>
    )
  }
}
