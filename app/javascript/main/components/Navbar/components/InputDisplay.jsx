// app/javascript/main/components/Navbar/components/InputDisplay.jsx

import React, { Component } from 'react'
import { Motion, spring } from 'react-motion'

// Components
import SearchInput from './SearchInput'
import SearchClose from './SearchClose'

export default class InputDisplay extends Component {
  state = {
    location: this.props.location,
    history: this.props.history,
    display: false,
    start: 0,
    end: 270,
    queryExists: false
  }

  render() {
    const { location, history, display, start, end, queryExists } = this.state

    if (display === false) return null

    const displayClose = queryExists ? '' : 'd-none'

    return(
      <Motion defaultStyle={{ x: start }} style={{ x: spring(end) }}>
        {value => (
          <div className="searchInput" style={{ width: `${value.x}px` }}>
            <i className="fa fa-search" id="searchIcon" aria-hidden="true"></i>

            <div className="form-inline">
              <SearchInput update={this.updateQuery} location={location} history={history} />
            </div>

            <SearchClose
              update={this.updateQuery}
              display={displayClose}
              location={location}
              history={history}
            />
          </div>
        )}
      </Motion>
    )
  }
}
