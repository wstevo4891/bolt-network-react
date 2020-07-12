// app/javascript/main/components/Navbar/components/InputDisplay.jsx

import React, { Component } from 'react'

// Components
import SearchInput from './SearchInput'
import SearchClose from './SearchClose'

const SEARCH_CLASSES = [
  'searchWrapper',
  'searchInput',
  'fa',
  'form-inline',
  'form-control'
]

class InputDisplay extends Component {
  render() {
    if (this.props.display === false) return null

    const { queryExists, handleKeyUp, handleInputClick } = this.props

    return(
      <div id="searchInput" style={{ width: 0 }}>
        <i className="fa fa-search" id="searchIcon" aria-hidden="true"></i>

        <div className="form-inline">
          <SearchInput
            placeholder="Titles, people, genres"
            handleKeyUp={handleKeyUp}
            handleClick={handleInputClick}
          />
        </div>

        <SearchClose
          query={queryExists}
          handleClick={this.handleCloseClick}
        />
      </div>
    )
  }

  handleCloseClick = () => {
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
      SEARCH_CLASSES.includes(targetClass)
    ) return

    document.querySelector('#searchInput').style.width = '0px'

    setTimeout(() => {
      this.props.hideDisplay()
    }, 400)
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

export default InputDisplay
