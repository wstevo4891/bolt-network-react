// app/javascript/main/scenes/Recent/components/MyList.jsx

import React, { Component } from 'react'

import ListEmpty from './components/ListEmpty'
import Results from '@components/Results'

export default class MyList extends Component {
  state = {
    movies: null
  }

  render() {
    const movies = this.state.movies

    if (movies === null) return null

    return(
      <div className="display-container">
        <div className="row">
          <div className="col-12 mb-4">
            <h1 style={{ color: 'white' }}>My List</h1>
          </div>
        </div>

        {this.renderList(movies, this.props.slideLength)}
      </div>
    )
  }

  renderList = (movies, slideLength) => {
    if (movies.length === 0) return <ListEmpty />
    
    return <Results movies={movies} slideLength={slideLength} />
  }

  componentDidMount() {
    if (this.state.movies !== null) return

    this.fetchMyList()
  }

  fetchMyList = () => {
    const list = JSON.parse(sessionStorage.getItem('MyList'))

    this.setState({
      movies: list === null ? [] : Object.values(list)
    })
  }
}
