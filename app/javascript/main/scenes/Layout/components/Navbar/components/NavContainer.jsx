import React, { Component } from 'react'

class NavContainer extends Component {
  render() {
    return(
      <div id="navbar">
        <nav className="navbar navbar-expand-md fixed-top">
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

  componentWillUnmount() {
    window.removeEventListener('resize', this.assignScrollListener)
    window.removeEventListener('scroll', this.handleScroll)
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
    document.querySelector('.navbar').classList.remove('nav-shadow')
  }

  addShadow = () => {
    document.querySelector('.navbar').classList.add('nav-shadow')
  }
}

export default NavContainer
