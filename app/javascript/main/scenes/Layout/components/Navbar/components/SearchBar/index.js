// SearchBar Main Component

import React, { Component } from 'react'
import { connect } from 'react-redux'

import './styles/index.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

// Components
import InputDisplay from './components/InputDisplay'

import { fetchSearchResults } from './actions/searchActions'

class SearchBar extends Component {
  state = {
    display: false,
    location: null,
    queryExists: false
  }

  // When we click on the hour glass button, we'll hide it,
  // render the searchInput div, and animate its width to 270px.
  render() {
    const { history } = this.props
    const { display, location, queryExists } = this.state

    const boxClass = display ? 'searchBox d-none' : 'searchBox'
    const wrapperClass = display ? 'searchWrapper' : 'searchWrapper d-none'

    return(
      <li className="d-sm-inline-block nav-item">
        <button
          className={boxClass}
          id="nav-item"
          onClick={this.handleClick}
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>

        <div className={wrapperClass}>
          <InputDisplay
            location={location}
            history={history}
            display={display}
            queryExists={queryExists}
            hideDisplay={this.hideDisplay}
            handleKeyUp={this.handleKeyUp}
          />
        </div>
      </li>
    )
  }

  handleClick = () => {
    this.setState({
      location: this.props.location,
      display: true
    })
  }

  hideDisplay = () => {
    this.setState({
      display: false
    })
  }

  handleKeyUp = (event) => {
    const query = event.target.value

    this.updateLocation(query)

    this.updateQueryState(query)

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

  updateQueryState = (query) => {
    if (query && query !== '') {
      this.setState({
        queryExists: true
      })
    } else {
      this.setState({
        queryExists: false
      })
    }
  }
}

export default connect()(SearchBar)
