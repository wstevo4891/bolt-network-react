// app/javascript/main_two/containers/Main.jsx

import React, { Component } from 'react'
import axios from 'axios'

import Navbar from '../../navbar/containers/Navbar'
import Routes from './Routes'
import SearchResults from '../../main/components/SearchResults'

export default class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: null,
      results: null,
      slideLength: this.props.slideLength
    }
  }

  render() {
    const { results, slideLength } = this.state

    return (
      <div id="main-container">
        <div id="navbar">
          <Navbar slideLength={slideLength} update={this.updateQuery} />
        </div>

        {this.determineRender(results, slideLength)}
      </div>
    )
  }

  determineRender = (results, slideLength) => {
    if (results && (results.genres.length > 0 || results.movies.length > 0)) {

      return <SearchResults results={results} slideLength={slideLength} />
    } else {
      return <Routes results={results} slideLength={slideLength} />
    }
  }

  updateQuery = (query) => {
    if (query && query.length > 0) {
      this.fetchSearchResults(query)
    } else {
      this.setState({
        query: null,
        results: null
      })
    }
  }

  fetchSearchResults = (query) => {
    axios.get(`/search/${query}`)
      .then(response => {
        console.log('Search Results: ' + JSON.stringify(response.data))

        this.setState({
          query: query,
          results: response.data
        })
      })
      .catch(error => {
        console.error('Error in Main.search()')
        console.error(error);
      })
  }
}
