// app/javascript/main/scenes/Recent/components/MyList.jsx

import React, { Component } from 'react'

import ListEmpty from './ListEmpty'
import Results from '../../components/Results'

export default class MyList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      slideLength: this.props.slideLength,
      movies: null
    }
  }

  componentWillReceiveProps(nextProps) {
    const slideLength = this.state.slideLength

    if (nextProps.slideLength === slideLength) return

    this.setState({
      slideLength: nextProps.slideLength
    })
  }

  render() {
    const { slideLength, movies } = this.state

    if (movies === null) return null

    return(
      <div className="display-container">
        <div className="row">
          <div className="col-12 mb-4">
            <h1 style={{ color: 'white' }}>Recently Added</h1>
          </div>
        </div>

        {this.renderList(movies, slideLength)}
      </div>
    )
  }

  componentDidMount() {
    const movies = this.state.movies

    if (movies !== null) return

    this.fetchMyList()
  }

  renderList = (movies, slideLength) => {
    if (movies.length === 0) {
      return <ListEmpty />
    } else {
      return <Results movies={movies} slideLength={slideLength} />
    }
  }

  fetchMyList = () => {
    let list = localStorage.getItem('MyList')

    if (list === null) {
      list = []
    }

    this.setState({
      movies: list
    })
  }
}
