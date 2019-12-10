// Search Scene

import React, { Component } from 'react'
import queryString from 'query-string'

// Components
import SearchResults from './components/SearchResults'

class Search extends Component {
  render() {
    const query = this.parseQuery()

    // console.log(this.props.location.search)

    console.log(this.props.search)

    const { genres, movies, people } = this.props.search

    return(
      <SearchResults
        genres={genres}
        movies={movies}
        people={people}
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
