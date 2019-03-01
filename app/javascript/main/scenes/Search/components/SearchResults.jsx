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
    console.log('nextProps.location.search')
    console.log(nextProps.location.search)

    const slideLength = nextProps.slideLength
    const query = this.parseQuery(nextProps.location.search)
    console.log('query: ' + query)

    if (query && query !== '') {
      const cancelablePromise = this.makeCancelable(
        this.fetchResults(query, slideLength)
      )

      cancelablePromise
        .promise
        .then(() => console.log('resolved'))
        .catch((reason) => console.log('isCanceled', reason.isCanceled))
      
      if (this._mounted === false) {
        cancelablePromise.cancel()
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

  componentWillUnMount() {
    this._mounted = false
  }

  parseQuery = (search) => {
    const q = queryString.parse(search).q
    return decodeURIComponent(q)
  }

  fetchResults = (query, slideLength) => {
    API.search.get(query)
      .then(response => {
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

  makeCancelable = (promise) => {
    let hasCanceled_ = false

    const wrappedPromise = new Promise((resolve, reject) => {
      promise.then(
        val => hasCanceled_ ? reject({isCanceled: true}) : resolve(val),
        error => hasCanceled_ ? reject({isCanceled: true}) : reject(error)
      )
    })

    return {
      promise: wrappedPromise,
      cancel() {
        hasCanceled_ = true
      }
    }
  }
}
