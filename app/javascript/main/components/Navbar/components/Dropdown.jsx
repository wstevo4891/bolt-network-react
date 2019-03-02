// app/javascript/main/components/Navbar/components/Dropdown.jsx

import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Dropdown extends Component {
  state = {
    id: this.props.id,
    dropdownId: this.props.dropdownId,
    path: this.props.path,
    text: this.props.text,
    links: this.props.links,
    show: false
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      path: nextProps.path
    })
  }

  render() {
    const { id, dropdownId, path, text, links, show } = this.state

    let itemClass
    if (path.match(/\/genres/)) {
      itemClass = "nav-item dropdown active"
    } else {
      itemClass = "nav-item dropdown"
    }

    let menuClass
    if (show) {
      menuClass = "dropdown-menu show"
    } else {
      menuClass = "dropdown-menu"
    }

    return(
      <li id={id} className={itemClass}>
        <a
          className="nav-link"
          href="#"
          id={dropdownId}
          role="button"
          aria-haspopup="true"
          aria-expanded="false"
          onClick={(event) => this.handleClick(event)}
        >
          {text}
          <i className="fa fa-angle-down"></i>
        </a>
        <div
          id={id}
          className={menuClass}
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
                {link.name}
              </Link>
            )
          }
        </div>
      </li>
    )
  }

  componentDidMount() {
    // Add the event listener that toggles the menu
    document.addEventListener('mouseup', this.handleMouseUp)
  }

  componentWillUnmount() {
    // Remove the mouseUp event listener
    window.removeEventListener('mouseup', this.handleMouseUp)
  }

  handleClick = (event) => {
    event.preventDefault()
    event.stopPropagation()
  }

  handleMouseUp = (event) => {
    const targetId = event.target.id

    console.log('handleMouseUp')
    console.log(targetId)

    if (targetId === this.state.dropdownId) {
      this.toggleShow()
    } else {
      this.setState({
        show: false
      })
    }
  }

  toggleShow = () => {
    if (this.state.show) {
      this.setState({
        show: false
      })
    } else {
      this.setState({
        show: true
      })
    }
  }
}
