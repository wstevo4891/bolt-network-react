// app/javascript/main/components/Navbar/containers/NavCollapse.jsx

import React from 'react'

// Components
import NavItem from './NavItem'
import Dropdown from './Dropdown'
import SearchBar from './SearchBar'

const NavCollapse = (props) => {
  const path = props.location.pathname
  const { genreLinks, history } = props

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
          links={genreLinks}
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
        <SearchBar
          location={path}
          history={history}
          fetchSearchResults={props.fetchSearchResults}
          handleInputClick={props.handleInputClick}
        />
      </ul>
    </div>
  )
}

export default NavCollapse
