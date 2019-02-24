// app/javascript/main/scenes/Search/components/SearchResults.jsx

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import queryString from 'query-string'

import API from '../../../services/API'
import SuggestionsList from './SuggestionsList'
import PosterRow from '../../components/PosterRow'

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
    const { slideLength, genres, movies } = this.state

    if (genres === null && movies === null) return null

    const slides = this.buildSlides(movies, slideLength)
    console.log('slides: ' + JSON.stringify(slides))

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
  
          <div className="row">
            {this.renderSlides(slides, slideLength)}
          </div>
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

  renderSlides = (slides, slideLength) => {
    if (slides.length === 0) return null

    return slides.map((slide, index) =>
      <div key={index} className="col-12 search-results-col">
        <PosterRow movies={slide} slideLength={slideLength} />
      </div>
    )
  }

  buildSlides = (items, limit) => {
    let slides = []
    let counter = 0
    let itemCount = 0
    let arr = []

    for (let item of items) {
      itemCount++

      if (counter < limit && itemCount < items.length) {
        arr.push(item)
        counter++
      } else if (itemCount === items.length) {
        if (arr.length === limit) {
          slides.push(arr)
          slides.push([item])
        } else {
          arr.push(item)
          slides.push(arr)
        }
      } else {
        slides.push(arr)
        counter = 0
        arr = []
      }
    }

    return slides
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
