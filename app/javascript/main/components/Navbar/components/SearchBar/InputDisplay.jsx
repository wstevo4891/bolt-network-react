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
  'fa fa-search',
  'form-inline',
  'form-control'
]

class InputDisplay extends Component {
  constructor(props) {
    super(props)
    this.mainRef = React.createRef()
  }

  get searchInput() {
    return document.getElementById('searchInput')
  }

  render() {
    if (this.props.display === false) return null

    const { queryExists, handleKeyUp, handleInputClick } = this.props

    return(
      <div id="searchInputDisplay" ref={this.mainRef} style={{ width: MIN_WIDTH }}>
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
    this.searchInput.value = ''

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
    if (
      this.mainRef.current === null ||
      this.searchInput.value.length > MIN_WIDTH ||
      SEARCH_CLASSES.includes(event.target.className)
    ) return

    this.mainRef.current.style.width = MIN_WIDTH

    setTimeout(() => {
      this.props.hideDisplay()
    }, 400)
  }

  componentDidUpdate() {
    if (
      this.props.display === false ||
      this.mainRef.current.style.width === MAX_WIDTH
    ) return

    setTimeout(() => {
      this.mainRef.current.style.width = MAX_WIDTH
    }, 100)
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.handleMouseUp)
  }
}

InputDisplay.propTypes = {
  display: PropTypes.bool.isRequired,
  queryExists: PropTypes.bool.isRequired,
  handleKeyUp: PropTypes.func.isRequired,
  handleInputClick: PropTypes.func.isRequired,
  hideDisplay: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object,
}

InputDisplay.defaultProps = {
  location: null,
}

export default InputDisplay
