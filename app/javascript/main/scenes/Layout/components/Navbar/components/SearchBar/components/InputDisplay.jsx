// app/javascript/main/components/Navbar/components/InputDisplay.jsx

import React, { Component } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

// Components
import SearchInput from './SearchInput'
import SearchClose from './SearchClose'

class InputDisplayPlus extends Component {
  searchClasses = [
    'searchWrapper',
    'searchInput',
    'fa',
    'form-inline',
    'form-control'
  ]

  render() {
    if (this.props.display === false) return null

    const { queryExists, handleKeyUp } = this.props

    return(
      <div id="searchInput" style={{ width: 0 }}>
        <FontAwesomeIcon
          icon={faSearch}
          id="searchIcon"
          aria-hidden="true"
        />

        <div className="form-inline">
          <SearchInput
            placeholder="Titles, people, genres"
            handleKeyUp={handleKeyUp}
          />
        </div>

        <SearchClose
          query={queryExists}
          handleClick={this.handleClick}
        />
      </div>
    )
  }

  handleMouseUp = (event) => {
    const $input = document.getElementById('searchInput')

    if ($input === null) return

    const searchValue = document.getElementById('search').value
    const targetClass = event.target.className

    this.shrinkAndHide(searchValue, targetClass)
  }

  shrinkAndHide = (value, targetClass) => {
    if (
      value.length > 0 ||
      this.searchClasses.includes(targetClass)
    ) return

    document.querySelector('#searchInput').style.width = '0px'

    setTimeout(() => {
      this.props.hideDisplay()
    }, 400)
  }

  handleClick = () => {
    const { history, location } = this.props
    document.getElementById('search').value = ''
    
    if (location === '/search') {
      history.push('/')
    } else {
      history.push(location)
    }
  }

  componentDidMount() {
    // Add the event listener that hides the search bar
    document.addEventListener('mouseup', this.handleMouseUp)
  }

  componentDidUpdate() {
    const display = this.props.display
    
    if (display === false) return
    
    const inputWidth = document.querySelector('#searchInput').style.width

    if (inputWidth === '270px') return

    setTimeout(() => {
      document.querySelector('#searchInput').style.width = '270px'
    }, 100)
  }

  componentWillUnmount() {
    // Remove the mouseUp event listener
    document.removeEventListener('mouseup', this.handleMouseUp)
  }
}

export default InputDisplayPlus
