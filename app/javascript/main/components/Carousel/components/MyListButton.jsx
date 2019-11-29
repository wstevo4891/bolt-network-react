// app/javascript/main/scenes/Home/Carousel/components/MyListButton.jsx

import React, { Component } from 'react'

import MyListService from '../services/MyListService'

export default class MyListButton extends Component {
  state = {
    inList: null
  }

  render() {
    const movie = this.props.movie
    const inList = this.state.inList

    return(
      <button
        className="btn-clear"
        onClick={() => this.toggleMyList(inList, movie)}
      >
        <i className={inList ? 'fa fa-check' : 'fa fa-plus'}></i>MY LIST
      </button>
    )
  }

  componentDidMount() {
    if (this.state.inList === null) {

      this.setState({
        inList: new MyListService(this.props.movie).findMovie()
      })
    }
  }

  toggleMyList = (inList, movie) => {
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

