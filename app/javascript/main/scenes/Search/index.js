// Search Scene

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import queryString from 'query-string'

// Actions
import { fetchSuggestions } from '../../store/actions/suggestionsActions'

// Components
import SearchResults from './components/SearchResults'

class Search extends Component {
  state = {
    suggestion: null
  }

  render() {
    const { genres, movies, people } = this.props
    
    const params = this.parseParams()

    const results = this.setResults(movies, params)

    return(
      <SearchResults
        headerProps={{
          suggestion: this.state.suggestion,
          suggestionId: params.suggestionId,
        }}
        resultsProps={{
          name: 'Search_Results',
          movies: results,
          slideLength: this.props.slideLength,
        }}
        suggestionsProps={{
          genres,
          movies,
          people,
          query: params.query,
          handleClick: this.handleClick,
        }}
      />
    )
  }

  parseParams = () => {
    const parsedQuery = queryString.parse(this.props.query)

    return {
      query: decodeURIComponent(parsedQuery.q),
      suggestionId: parsedQuery.suggestionId,
    }
  }

  setResults = (movies, params) => {
    if (params.suggestionId && this.state.suggestion) {
      return this.props.suggestions.movies
    } else {
      return movies
    }
  }

  handleClick = (event) => {
    this.setState({
      suggestion: event.target.text
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.query === prevProps.query) return

    const params = this.parseParams()

    if (params.suggestionId) {
      this.props.dispatch(fetchSuggestions(params))
    } else {
      this.setState({ suggestion: null })
    }
  }
}

Search.propTypes = {
  dispatch: PropTypes.func.isRequired,
  genres: PropTypes.array,
  movies: PropTypes.array,
  people: PropTypes.array,
  slideLength: PropTypes.number,
  suggestions: PropTypes.object,
  query: PropTypes.string,
}

export default connect()(Search)
