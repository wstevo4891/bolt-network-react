// app/javascript/main/components/Navbar/containers/SearchBar.jsx

import React, { Component } from 'react'
import { Motion, spring } from 'react-motion'

// Components
import InputDisplay from '../components/InputDisplay'

export default class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: this.props.location,
      history: this.props.history,
      display: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location === '/search') {
      this.setState({
        history: nextProps.history
      })
    } else {
      this.setState({
        location: nextProps.location,
        history: nextProps.history
      })
    }
  }

  // When we click on the hour glass button, we'll hide it,
  // render the searchInput div, and animate its width to 270px.
  render() {
    const { location, history, display } = this.state

    const boxClass = display ? 'searchBox d-none' : 'searchBox'
    const wrapperClass = display ? 'searchWrapper' : 'searchWrapper d-none'

    return(
      <li className="d-sm-inline-block nav-item">
        <button className={boxClass} id="nav-item" onClick={this.handleClick}>
          <i className="fa fa-search" aria-hidden="true"></i>
        </button>

        <div className={wrapperClass}>
          <InputDisplay
            location={location}
            history={history}
            display={display}
            closeDisplay={this.closeDisplay}
          />
        </div>
      </li>
    )
  }

  handleClick = () => {
    this.setState({
      display: true
    })
  }

  closeDisplay = () => {
    this.setState({
      display: false
    })
  }
}
