// app/javascript/main/scenes/Home/Carousel/components/MyListButton.jsx

import React, { Component } from 'react'

import MyListService from '../../../services/MyListService'

export default class MyListButton extends Component {
  state = {
    movie: this.props.movie,
    inList: null
  }

  render() {
    const { movie, inList } = this.state

    return(
      <a
        className="btn-clear"
        onClick={() => this.toggleMyList(inList, movie)}
      >
        <i className={inList ? 'fa fa-check' : 'fa fa-plus'}></i>MY LIST
      </a>
    )
  }

  componentDidMount() {
    let { movie, inList } = this.state

    if (inList === null) {
      inList = new MyListService(movie).findMovie()

      this.setState({
        inList: inList
      })
    }
  }

  toggleMyList = (inList, movie) => {
    if (inList === true) {
      new MyListService(movie).remove()

      this.setState({
        inList: false
      })

    } else {
      new MyListService(movie).add()

      this.setState({
        inList: true
      })
    }
  }
}

