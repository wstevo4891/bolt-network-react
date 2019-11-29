// MyListButton Container Class

import React, { Component } from 'react'

import MyListService from './services/MyListService'

import BannerButton from './components/BannerButton'
import IconButton from './components/IconButton'

export default class MyListButton extends Component {
  state = {
    inList: null
  }

  render() {
    const iconClass = this.state.inList ? 'fa fa-check' : 'fa fa-plus'

    if (this.props.type === 'icon') {
      return(
        <IconButton
          iconClass={iconClass}
          handleClick={this.toggleMyList}
        />
      )
    } else {
      return(
        <BannerButton
          iconClass={iconClass}
          handleClick={this.toggleMyList}
        />
      )
    }
  }

  componentDidMount() {
    if (this.state.inList === null) {

      this.setState({
        inList: new MyListService(this.props.movie).findMovie()
      })
    }
  }

  toggleMyList = () => {
    const inList = this.state.inList
    const movie = this.props.movie

    if (inList === true) {
      new MyListService(movie).remove()
    } else {
      new MyListService(movie).add()
    }

    this.setState({
      inList: !inList
    })
  }
}
