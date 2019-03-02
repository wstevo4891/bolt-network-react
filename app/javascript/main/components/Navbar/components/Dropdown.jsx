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
    show: this.props.dropdownShow
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
          onClick={(event) => this.toggleShow(event, show)}
        >
          {text}
          <i className="fa fa-angle-down"></i>
        </a>
        <div
          id={id}
          className={menuClass}
          aria-labelledby={dropdownId}
          onClick={this.handleLinkClick}
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

  toggleShow = (event, show) => {
    event.preventDefault()
    event.stopPropagation()

    if (show) {
      this.setState({
        show: false
      })
    } else {
      this.setState({
        show: true
      })
    }
  }

  handleLinkClick = () => {
    this.setState({
      show: false
    })
  }
}
