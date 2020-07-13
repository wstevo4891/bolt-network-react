import React, { Component } from 'react'
import PropTypes from 'prop-types'

class NavContainer extends Component {
  constructor(props) {
    super(props)
    this.navbarRef = React.createRef()
  }

  render() {
    return(
      <div id="navbar">
        <nav
          className="navbar navbar-expand-md fixed-top"
          ref={this.navbarRef}
        >
          {this.props.children}
        </nav>
      </div>
    )
  }

  componentDidMount() {
    this.assignScrollListener()

    window.addEventListener('resize', this.assignScrollListener)
  }

  assignScrollListener = () => {
    if (window.innerWidth < 768) {
      this.addShadow()
      window.removeEventListener('scroll', this.handleScroll)

    } else {
      this.removeShadow()
      window.addEventListener('scroll', this.handleScroll)
    }
  }

  handleScroll = () => {
    const scrollLength = window.scrollY

    if (scrollLength > 20) {
      this.addShadow()
    } else {
      this.removeShadow()
    }
  }

  removeShadow = () => {
    this.navbarRef.current.classList.remove('nav-shadow')
  }

  addShadow = () => {
    this.navbarRef.current.classList.add('nav-shadow')
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.assignScrollListener)
    window.removeEventListener('scroll', this.handleScroll)
  }
}

NavContainer.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
}

export default NavContainer
