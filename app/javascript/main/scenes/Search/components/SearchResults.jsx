// app/javascript/main/scenes/Search/components/SearchResults.jsx

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import queryString from 'query-string'

import API from '../../../services/API'
import SuggestionsList from './SuggestionsList'
import Results from '../../components/Results'

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
    const query = queryString.parse(nextProps.location.search).q

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

    if (genres === null && movies === null) return null

    return(
      <div className="search-results">
        <div className="display-container">
          <div className="row">
            <div className="col-12">
              <div className="suggestions">
                <span className="suggestionsLabel">Explore titles related to: </span>

                <SuggestionsList genres={genres} movies={movies} />
              </div>
            </div>
          </div>

          <Results movies={movies} slideLength={slideLength} />
        </div>
      </div>
    )
  }

  componentDidMount() {
    console.log('SearchResults Mounted')
    console.log(this.state)
    console.log(this.props.location)

    const { slideLength, query } = this.state

    if (query === null) {
      const query = queryString.parse(this.props.location.search).q

      this.fetchResults(query, slideLength)
    }
  }

  componentDidUpdate() {
    console.log('SearchResults Updated')
    console.log(this.state)
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
