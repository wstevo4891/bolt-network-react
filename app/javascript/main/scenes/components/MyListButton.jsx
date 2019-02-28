// app/javascript/main/scenes/components/MyListButton.jsx

import React, { Component } from 'react'

import MyListService from '../services/MyListService'

export default class MyListButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      movieId: this.props.movieId,
      inList: null
    }
  }

  render() {
    const { movieId, inList } = this.state

    return(
      <li className="poster-btn poster-btn-my-list">
        <button onClick={() => this.toggleMyList(inList, movieId)}>
          <i className={inList ? 'fa fa-check' : 'fa fa-plus'}></i>
        </button>
      </li>
    )
  }

  componentDidMount() {
    let { movieId, inList } = this.state

    if (inList === null) {
      inList = new MyListService(movieId).findMovie()

      this.setState({
        inList: inList
      })
    }
  }

  toggleMyList = (inList, movieId) => {
    if (inList === true) {
      new MyListService(movieId).remove()

      this.setState({
        inList: false
      })

    } else {
      new MyListService(movieId).add()

      this.setState({
        inList: true
      })
    }
  }
}
