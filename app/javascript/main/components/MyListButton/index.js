// MyListButton Container Class

import React, { Component } from 'react'

import SessionList from '../../services/SessionList'

import BannerButton from './components/BannerButton'
import IconButton from './components/IconButton'

export default class MyListButton extends Component {
  state = {
    myList: new SessionList(this.props.movie, 'MyList'),
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
    const inList = this.state.myList.findMovie()

    this.setState({ inList: inList })
  }

  toggleMyList = () => {
    const { myList, inList } = this.state

    inList ? myList.remove() : myList.add()

    this.setState({
      inList: !inList
    })
  }
}
