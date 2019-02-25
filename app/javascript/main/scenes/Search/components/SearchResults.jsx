// app/javascript/main/scenes/Search/components/SearchResults.jsx

import React, { Component } from 'react'
import queryString from 'query-string'

import API from '../../../services/API'
import ResultsDisplay from './ResultsDisplay'
import NotFound from './NotFound'

export default class SearchResults extends Component {
  constructor(props) {
    super(props)
    this.state = {
      slideLength: this.props.slideLength,
      query: null,
      genres: null,
      movies: null
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('Search Results Will Receive Props')
    console.log('===============================================')
    console.log(nextProps)

    const slideLength = nextProps.slideLength
    const query = this.parseQuery()

    if (query && query !== '') {
      this.fetchResults(query, slideLength)
    } else {
      this.setState({
        query: null,
        genres: null,
        movies: null
      })
    }
  }

  render() {
    const { slideLength, query, genres, movies } = this.state

    if (genres === null && movies === null) {
      return null

    } else if (genres.length === 0 && movies.length === 0) {
      return <NotFound search={this.props.location.search} />

    } else {
      return(
        <ResultsDisplay
          genres={genres}
          movies={movies}
          slideLength={slideLength}
        />
      )
    }
  }

  componentDidMount() {
    console.log('SearchResults Mounted')
    console.log(this.state)
    console.log(this.props.location)

    const { slideLength, query } = this.state

    if (query === null) {
      const query = this.parseQuery()

      this.fetchResults(query, slideLength)
    }
  }

  componentDidUpdate() {
    console.log('SearchResults Updated')
    console.log(this.state)
  }

  parseQuery = () => {
    const q = queryString.parse(this.props.location.search).q
    return decodeURIComponent(q)
  }

  resultsNotFound = (genres, movies) => {
    return genres === null || genres.length === 0 &&
      movies === null || movies.length === 0
  }

  fetchResults = (query, slideLength) => {
    API.search.get(query)
      .then(response => {
        console.log('Search Results: ' + JSON.stringify(response.data))

        this.setState({
          slideLength: slideLength,
          query: query,
          genres: response.data.genres,
          movies: response.data.movies
        })
      })
      .catch(error => {
        console.error('Error in SearchResults.fetchResults()')
        console.error(error);
      })
  }
}
