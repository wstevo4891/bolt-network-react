// Navbar UI Component

import React from 'react'
import PropTypes from 'prop-types'

// Components
import { Link } from 'react-router-dom'

import {
  Hamburger,
  NavContainer,
  SearchInput,
  SideMenu,
} from './components'

import NavCollapse from './NavCollapse'

// Images
import logo from './images/bolt-network.svg'

const NavbarUI = (props) => (
  <NavContainer>
    <Hamburger
      dataTarget="side-menu"
      handleClick={props.toggleDisplay}
    />

    <Link className="navbar-brand" to="/">
      <img src={logo} alt="Bolt Network logo" className="logo" />
    </Link>

    <NavCollapse
      {...props}
      genreLinks={props.genreLinks}
      fetchSearchResults={props.fetchSearchResults}
      handleInputClick={props.handleInputClick}
    />

    <div id="mobileSearchInput">
      <div className="form-inline">
        <SearchInput
          placeholder="Search"
          handleKeyUp={props.handleKeyUp}
          handleClick={props.handleInputClick}
        />
      </div>
    </div>

    <SideMenu
      {...props}
      genres={props.genreLinks}
      display={props.displayMenu}
      toggleDisplay={props.toggleDisplay}
    />
  </NavContainer>
)

NavbarUI.propTypes = {
  displayMenu: PropTypes.bool,
  genreLinks: PropTypes.array,
  toggleDisplay: PropTypes.func,
  fetchSearchResults: PropTypes.func,
  handleKeyUp: PropTypes.func,
  handleInputClick: PropTypes.func
}

export default NavbarUI
