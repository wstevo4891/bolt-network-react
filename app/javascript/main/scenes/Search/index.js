// Search Scene

import React, { Component } from 'react'
import queryString from 'query-string'

// Styles
import './styles/index.scss'

// Components
import SearchResults from './components/SearchResults'

class Search extends Component {
  render() {
    const query = this.parseQuery()

    const { genres, movies } = this.props.search

    return(
      <SearchResults
        genres={genres}
        movies={movies}
        query={query}
        slideLength={this.props.slideLength}
      />
    )
  }

  parseQuery = () => {
    const search = this.props.location.search
    const query = queryString.parse(search).q
    return decodeURIComponent(query)
  }
}

export default Search
