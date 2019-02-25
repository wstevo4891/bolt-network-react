// app/javascript/main/components/Navbar/containers/SearchBar.jsx

import React, { Component } from 'react'
import { Motion, spring } from 'react-motion'

import SearchInput from '../components/SearchInput'
import SearchClose from '../components/SearchClose'

export default class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: this.props.location,
      display: false,
      start: 0,
      end: 270,
      queryExists: false
    }

    this.searchClasses = [
      'searchWrapper',
      'searchInput',
      'fa',
      'form-inline',
      'form-control'
    ]
  }

  componentWillReceiveProps(nextProps) {
    const location = nextProps.location

    if (location.match(/search/)) return

    this.setState({
      location: location
    })
  }

  render() {
    // console.log('SearchBar Rendering')
    // console.log(this.state.location)
    // console.log('###########################################')
    // console.log(this.props)

    const display = this.state.display
    const boxClass = display ? 'searchBox d-none' : 'searchBox'
    const wrapperClass = display ? 'searchWrapper' : 'searchWrapper d-none'

    return(
      <li className="d-sm-inline-block nav-item">
        <button className={boxClass} id="nav-item" onClick={this.handleClick}>
          <i className="fa fa-search" aria-hidden="true"></i>
        </button>

        <div className={wrapperClass}>
          {this.displayInput()}
        </div>
      </li>
    )
  }

  componentDidMount() {
    // Add the event listener that hides the search bar
    document.addEventListener('mouseup', this.handleMouseUp)
  }

  handleClick = () => {
    this.setState({
      display: true
    })
  }

  // When we click on the hour glass button, we'll hide it,
  // render the searchInput div, and animate its width to 270px.
  displayInput = () => {
    const { location, display, start, end, queryExists } = this.state

    if (display === false) return null

    const displayClose = queryExists ? '' : 'd-none'

    return(
      <Motion defaultStyle={{ x: start }} style={{ x: spring(end) }}>
        {value => (
          <div className="searchInput" style={{ width: `${value.x}px` }}>
            <i className="fa fa-search" id="searchIcon" aria-hidden="true"></i>

            <form className="form-inline" action="#">
              <SearchInput update={this.updateQuery} location={location} />
            </form>

            <SearchClose
              update={this.updateQuery}
              display={displayClose}
              location={location}
            />
          </div>
        )}
      </Motion>
    )
  }

  handleMouseUp = (event) => {
    const targetClass = event.target.className
    const $input = document.querySelector('.searchInput')

    if ($input === null) return

    const searchValue = document.getElementById('search').value

    if ($input && searchValue.length === 0 && !this.searchClasses.includes(targetClass)) {
      this.setState({
        start: 270,
        end: 0
      })

      setTimeout(() => {
        this.setState({
          display: false,
          start: 0,
          end: 270
        })
      }, 400)
    }
  }

  updateQuery = (query) => {
    // console.log('Update Query')
    // console.log(query)

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
