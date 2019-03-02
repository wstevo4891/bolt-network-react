// app/javascript/main/scenes/Search/components/SearchResults.jsx

import React, { Component } from 'react'
import queryString from 'query-string'

// Services
import API from '../../../services/API'

// Components
import ResultsDisplay from './ResultsDisplay'
import NotFound from './NotFound'

export default class SearchResults extends Component {
  constructor(props) {
    super(props)
    this.state = {
      slideLength: this.props.slideLength,
      search: this.props.location.search,
      query: null,
      genres: null,
      movies: null
    }

    this._mounted = false
  }

  componentWillReceiveProps(nextProps) {
    const slideLength = nextProps.slideLength
    const query = this.parseQuery(nextProps.location.search)

    if (query === this.state.query) {
      if (this.state.slideLength === slideLength) return

      this.setState({
        slideLength: slideLength
      })

    } else {
      if (query && query !== '') {
        this.fetchResults(query, slideLength)
      }
    }
  }

  render() {
    const { slideLength, query, genres, movies } = this.state

    if (genres === null && movies === null) {
      return null

    } else if (genres.length === 0 && movies.length === 0) {
      return <NotFound query={query} />

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
    this._mounted = true

    const { slideLength, search, query } = this.state

    if (query === null) {
      const query = this.parseQuery(search)

      this.fetchResults(query, slideLength)
    }
  }

  componentWillUnmount() {
    this._mounted = false
  }

  parseQuery = (search) => {
    const q = queryString.parse(search).q
    return decodeURIComponent(q)
  }

  fetchResults = (query, slideLength) => {
    API.search.get(query)
      .then(response => {
        // =====================================================
        // Prevent this.setState() if component is unmounted
        // =====================================================
        if (this._mounted === false) return

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
