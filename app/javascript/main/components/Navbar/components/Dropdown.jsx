// app/javascript/main/components/Navbar/components/Dropdown.jsx

import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { IconButton } from '@components'

export default class Dropdown extends Component {
  state = {
    show: false
  }

  render() {
    const { id, dropdownId, text } = this.props

    return(
      <li id={id} className={this.itemClass()}>
        <IconButton
          ariaExpanded="false"
          ariaHasPopup="true"
          buttonClass="nav-link"
          id={dropdownId}
          icon="fa-angle-down"
          text={text}
          textPlacement="left"
        />

        <div
          id={id}
          className={this.menuClass()}
          aria-labelledby={dropdownId}
        >
          {this.renderLinks()}
        </div>
      </li>
    )
  }

  renderLinks() {
    return this.props.links.map((link, index) =>
      <Link
        key={index.toString()}
        id={`genre-link-${index}`}
        className="dropdown-item"
        to={link.url}
      >
        {link.text}
      </Link>
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

  handleMouseUp = (event) => {
    if (event.target.id === this.props.dropdownId) {
      this.toggleShow()
    } else {
      this.setState({
        show: false
      })
    }
  }

  toggleShow = () => {
    this.setState(prevState => ({ show: !prevState.show }))
  }

  componentWillUnmount() {
    // Remove the mouseUp event listener
    window.removeEventListener('mouseup', this.handleMouseUp)
  }
}
