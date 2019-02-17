// app/javascript/navbar/components/SearchBar.jsx

import React, { Component } from 'react'
import { Motion, spring } from 'react-motion'

export default class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      display: false,
      start: 0,
      end: 270,
      query: null
    }

    this.searchClasses = [
      'searchWrapper',
      'searchInput',
      'fa',
      'form-inline',
      'form-control'
    ]
  }

  render() {
    const { display, start, end, query } = this.state
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
    const { display, start, end } = this.state

    if (display === false) return null

    return(
      <Motion defaultStyle={{ x: start }} style={{ x: spring(end) }}>
        {value => (
          <div className="searchInput" style={{ width: `${value.x}px` }}>
            <i className="fa fa-search" id="searchIcon" aria-hidden="true"></i>

            <form className="form-inline" action="#">
              <input
                type="text"
                name="query"
                id="search"
                className="form-control"
                placeholder="Titles, people, genres"
                aria-label="Titles, people, genres"
                onKeyUp={this.handleKeyUp}
              />
            </form>

            <i className="fa fa-times" id="closeIcon" aria-hidden="true"></i>
          </div>
        )}
      </Motion>
    )
  }

  handleMouseUp = (event) => {
    const targetClass = event.target.className
    const $input = document.querySelector('.searchInput')

    if ($input && !this.searchClasses.includes(targetClass)) {
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

  handleKeyUp = (event) => {
    const target = event.target

    this.props.update(target.value)
  }
}
