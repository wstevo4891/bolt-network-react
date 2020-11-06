import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  DisplayContainer,
  Results,
  TitleRow,
} from '@components'

import ListEmpty from './ListEmpty'

class MyList extends Component {
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
    
    return <Results movies={movies} name="MyList" slideLength={slideLength} />
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

MyList.propTypes = {
  slideLength: PropTypes.number,
}

export default MyList
