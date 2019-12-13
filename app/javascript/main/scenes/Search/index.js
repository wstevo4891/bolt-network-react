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
    const params = this.parseParams()

    console.log(params)

    const { genres, movies, people } = this.props.search

    return(
      <SearchResults
        genres={genres}
        movies={movies}
        people={people}
        params={params}
        suggestion={this.state.suggestion}
        slideLength={this.props.slideLength}
        handleClick={this.handleClick}
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

  handleClick = (event) => {
    this.setState({
      suggestion: event.target.text
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.search === prevProps.location.search) return

    const params = this.parseParams()

    console.log(params.suggestionId)

    if (params.suggestionId) {
      this.props.dispatch(fetchSuggestions(params))
    }
  }
}

export default connect()(Search)
