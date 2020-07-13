// Search Scene

import React, { Component } from 'react'
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
    const { genres, movies, people } = this.props.search
    
    const params = this.parseParams()

    const results = this.setResults(params)

    return(
      <SearchResults
        headerProps={{
          suggestion: this.state.suggestion,
          suggestionId: params.suggestionId,
        }}
        resultsProps={{
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
    const search = this.props.location.search

    return {
      query: decodeURIComponent(queryString.parse(search).q),

      suggestionId: queryString.parse(search).suggestionId
    }
  }

  setResults = (params) => {
    if (params.suggestionId && this.state.suggestion) {
      return this.props.suggestions.movies
    } else {
      return this.props.search.movies
    }
  }

  handleClick = (event) => {
    this.setState({
      suggestion: event.target.text
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.search === prevProps.location.search) return

    const params = this.parseParams()

    if (params.suggestionId) {
      this.props.dispatch(fetchSuggestions(params))
    } else {
      this.setState({ suggestion: null })
    }
  }
}

export default connect()(Search)
