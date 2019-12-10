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

    console.log(this.props.suggestions)

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

  parseQuery = () => {
    const search = this.props.location.search
    const query = queryString.parse(search).q
    return decodeURIComponent(query)
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.search === prevProps.location.search) return

    const params = this.parseParams()

    console.log(params.suggestionId)

    if (params.suggestionId) {
      this.props.dispatch(fetchSuggestions(params))
    }
  }

  parseParams = () => {
    const params = {}
    const search = this.props.location.search
    params.query = decodeURIComponent(queryString.parse(search).q)
    params.suggestionId = queryString.parse(search).suggestionId
    return params
  }

  handleClick = (event) => {
    this.setState({
      suggestion: event.target.text
    })
  }

  // fetchSuggestionData = async ({ query, suggestionId }) => {
  //   try {
  //     const response = await fetchSuggestions(query, suggestionId)

  //     const data = await response.json()

  //     this.setState({
  //       suggestionId: suggestionId,
  //       suggestions: data
  //     })
  //   } catch(error) {
  //     console.error(error)
  //   }
  // }
}

export default connect()(Search)
