// app/javascript/main/scenes/Recent/components/MyList.jsx

import React, { Component } from 'react'

import {
  DisplayContainer,
  Results,
  TitleRow,
} from '@components'

import ListEmpty from './ListEmpty'

export default class MyList extends Component {
  state = {
    movies: null
  }

  render() {
    const movies = this.state.movies
    if (movies === null) return null

    return (
      <DisplayContainer>
        <TitleRow title="My List" />
        {this.renderList(movies, this.props.slideLength)}
      </DisplayContainer>
    )
  }

  renderList = (movies, slideLength) => {
    if (movies.length === 0) return <ListEmpty />
    
    return <Results movies={movies} slideLength={slideLength} />
  }

  componentDidMount() {
    this.fetchMyList()
  }

  fetchMyList = () => {
    const list = JSON.parse(sessionStorage.getItem('MyList'))

    const newMovies = list === null ? [] : Object.values(list)

    this.setState({
      movies: newMovies
    })
  }
}
