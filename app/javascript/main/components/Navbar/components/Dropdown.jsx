// app/javascript/main/components/Navbar/components/Dropdown.jsx

import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Dropdown extends Component {
  state = {
    show: false
  }

  render() {
    const { id, dropdownId, text, links } = this.props

    return(
      <li id={id} className={this.itemClass()}>
        <button
          className="nav-link"
          id={dropdownId}
          aria-haspopup="true"
          aria-expanded="false"
        >
          {text}
          <i className="fa fa-angle-down"></i>
        </button>

        <div
          id={id}
          className={this.menuClass()}
          aria-labelledby={dropdownId}
        >
          {
            links.map((link, index) =>
              <Link
                key={index}
                id={`genre-link-${index}`}
                className="dropdown-item"
                to={link.url}
              >
                {link.text}
              </Link>
            )
          }
        </div>
      </li>
    )
  }

  menuClass = () => {
    return this.state.show ? 'dropdown-menu show' : 'dropdown-menu'
  }

  itemClass = () => {
    if (this.props.path.match(/\/genres/)) {
      return "nav-item dropdown active"
    } else {
      return "nav-item dropdown"
    }
  }

  componentDidMount() {
    // Add the event listener that toggles the menu
    document.addEventListener('mouseup', this.handleMouseUp)
  }

  componentWillUnmount() {
    // Remove the mouseUp event listener
    window.removeEventListener('mouseup', this.handleMouseUp)
  }

  handleMouseUp = (event) => {
    const targetId = event.target.id

    if (targetId === this.props.dropdownId) {
      this.toggleShow()
    } else {
      this.setState({
        show: false
      })
    }
  }

  toggleShow = () => {
    this.setState({
      show: !this.state.show
    })
  }
}
