// Navbar Main Component

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

// Components
import NavContainer from './components/NavContainer'
import NavCollapse from './components/NavCollapse'
import SideMenu from './components/SideMenu'
import Hamburger from './components/Hamburger'
import SearchInput from './components/SearchBar/components/SearchInput'

import logo from './images/bolt-network.svg'

import { fetchSearchResults } from '../../store/actions/searchActions'

class Navbar extends Component {
  state = {
    location: this.props.history.location,
    displayMenu: false
  }

  render() {
    const genreLinks = Object.values(this.props.genresIndex)

    return (
      <NavContainer>
        <Hamburger
          dataTarget="side-menu"
          handleClick={this.toggleDisplay}
        />

        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Bolt Network logo" className="logo" />
        </Link>

        <NavCollapse
          {...this.props}
          genreLinks={genreLinks}
          fetchSearchResults={fetchSearchResults}
        />

        <div id="mobileSearchInput">
          <div className="form-inline">
            <SearchInput
              placeholder="Search"
              handleKeyUp={this.handleKeyUp}
            />
          </div>
        </div>

        <SideMenu
          {...this.props}
          genres={genreLinks}
          display={this.state.displayMenu}
          toggleDisplay={this.toggleDisplay}
        />
      </NavContainer>
    )
  }

  toggleDisplay = () => {
    this.setState({
      displayMenu: !this.state.displayMenu
    })
  }

  handleKeyUp = (event) => {
    const query = event.target.value

    this.updateLocation(query)

    this.props.dispatch(fetchSearchResults(query))
  }

  updateLocation = (query) => {
    const history = this.props.history
    const location = this.state.location

    if (query && query !== '') {
      history.push(`/search?q=${encodeURIComponent(query)}`)
    
    } else if (location === '/search') {
      history.push('/')
    
    } else {
      history.push(location)
    }
  }

  componentDidUpdate() {
    const stateLocation = this.state.location
    const propsLocation = this.props.history.location

    if (
      propsLocation === '/search' ||
      propsLocation === stateLocation
    ) return

    this.setState({
      location: propsLocation
    })
  }
}

function mapStateToProps(state) {
  return {
    genresIndex: state.moviesIndex.genresIndex
  }
}

export default connect(mapStateToProps)(Navbar)
