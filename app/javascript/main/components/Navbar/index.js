// Navbar Main Component

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Components
import NavbarUI from './components/NavbarUI'

// Actions
import { fetchSearchResults } from '@store/actions/searchActions'

import { resetSuggestions } from '@store/actions/suggestionsActions'

class Navbar extends Component {
  constructor(props) {
    super(props)

    this.genreLinks = Object.values(props.genresIndex)

    this.state = {
      location: props.location.pathname,
      displayMenu: false
    }

    this.handleInputClick = this.handleInputClick.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
    this.toggleDisplay = this.toggleDisplay.bind(this)
  }

  render() {
    const { history, location } = this.props

    return (
      <NavbarUI
        history={history}
        location={location}
        displayMenu={this.state.displayMenu}
        genreLinks={this.genreLinks}
        toggleDisplay={this.toggleDisplay}
        fetchSearchResults={fetchSearchResults}
        handleKeyUp={this.handleKeyUp}
        handleInputClick={this.handleInputClick}
      />
    )
  }

  toggleDisplay() {
    this.setState(prevState => ({ displayMenu: !prevState.displayMenu }))
  }

  handleKeyUp(event) {
    const query = event.target.value

    this.updateLocation(query)

    this.props.dispatch(resetSuggestions())

    this.props.dispatch(fetchSearchResults(query))
  }

  handleInputClick(event) {
    const query = event.target.value

    this.updateLocation(query)

    this.props.dispatch(resetSuggestions())
  }

  updateLocation(query) {
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
    const propsLocation = this.props.location.pathname

    if (
      propsLocation === '/search' ||
      propsLocation === stateLocation
    ) return

    this.setState({
      location: propsLocation
    })
  }
}

Navbar.propTypes = {
  genresIndex: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func
}

function mapStateToProps(state) {
  return {
    genresIndex: state.moviesIndex.genresIndex
  }
}

export default connect(mapStateToProps)(Navbar)
