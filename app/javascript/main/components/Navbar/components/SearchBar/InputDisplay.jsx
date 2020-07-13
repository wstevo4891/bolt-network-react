// app/javascript/main/components/Navbar/components/InputDisplay.jsx

import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Components
import { Icon } from '@components'
import SearchInput from '../SearchInput'
import SearchClose from './SearchClose'

const MIN_WIDTH = 0

const MAX_WIDTH = '270px'

const SEARCH_CLASSES = [
  'searchWrapper',
  'searchInput',
  'fa',
  'form-inline',
  'form-control'
]

const SEARCH_ID = 'search'

const SEARCH_INPUT_ID = 'searchInput'

class InputDisplay extends Component {
  render() {
    if (this.props.display === false) return null

    const { queryExists, handleKeyUp, handleInputClick } = this.props

    return(
      <div id={SEARCH_INPUT_ID} style={{ width: MIN_WIDTH }}>
        <Icon icon="fa-search" id="searchIcon" ariaHidden="true" />

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
    document.getElementById(SEARCH_ID).value = ''
    
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
    const $input = document.getElementById(SEARCH_INPUT_ID)

    if ($input === null) return

    const searchValue = document.getElementById(SEARCH_ID).value
    const targetClass = event.target.className

    this.shrinkAndHide(searchValue, targetClass)
  }

  shrinkAndHide = (value, targetClass) => {
    if (
      value.length > MIN_WIDTH ||
      SEARCH_CLASSES.includes(targetClass)
    ) return

    document.getElementById(SEARCH_INPUT_ID).style.width = MIN_WIDTH

    setTimeout(() => {
      this.props.hideDisplay()
    }, 400)
  }

  componentDidUpdate() {
    const display = this.props.display
    
    if (display === false) return
    
    const inputWidth = document.getElementById(SEARCH_INPUT_ID).style.width

    if (inputWidth === MAX_WIDTH) return

    setTimeout(() => {
      document.getElementById(SEARCH_INPUT_ID).style.width = MAX_WIDTH
    }, 100)
  }

  componentWillUnmount() {
    // Remove the mouseUp event listener
    document.removeEventListener('mouseup', this.handleMouseUp)
  }
}

InputDisplay.propTypes = {
  display: PropTypes.bool,
  queryExists: PropTypes.bool,
  handleKeyUp: PropTypes.func,
  handleInputClick: PropTypes.func,
}

export default InputDisplay
