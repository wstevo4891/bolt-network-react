// app/javascript/main/components/SearchResults

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import queryString from 'query-string'

import API from '../../main_two/API'
import Suggestions from '../services/Suggestions'
import PosterRow from './PosterRow'

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
    // const { results, slideLength } = nextProps

    // const genres = results.genres
    // const movies = results.movies

    // const nextSuggestions = new Suggestions(genres, movies).call()
    // console.log('nextSuggestions: ' + JSON.stringify(nextSuggestions))

    // const nextSlides = this.buildSlides(movies, slideLength)
    // console.log('nextSlides: ' + JSON.stringify(nextSlides))

    // this.setState({
    //   genres: nextProps.results.genres,
    //   movies: nextProps.results.movies,
    //   slideLength: nextProps.slideLength,
    //   suggestions: nextSuggestions,
    //   slides: nextSlides
    // })

    console.log('Search Results Will Receive Props')
    console.log('===============================================')
    console.log(nextProps)

    const slideLength = nextProps.slideLength
    const query = queryString.parse(nextProps.location.search).q

    this.fetchResults(query, slideLength)
  }

  render() {
    const { slideLength, genres, movies } = this.state

    if (genres === null && movies === null) return null

    const suggestions = new Suggestions(genres, movies).call()
    console.log('suggestions: ' + JSON.stringify(suggestions))

    const slides = this.buildSlides(movies, slideLength)
    console.log('slides: ' + JSON.stringify(slides))

    return(
      <div className="search-results">
        <div className="display-container">
          <div className="row">
            <div className="col-12">
              <div className="suggestions">
                <span className="suggestionsLabel">Explore titles related to: </span>
                <ul>
                  {this.renderSuggestions(suggestions)}
                </ul>
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

    // if (suggestions.length === 0 && slides.length === 0) {
    //   const nextSuggestions = new Suggestions(genres, movies).call()
    //   console.log('nextSuggestions: ' + JSON.stringify(nextSuggestions))

    //   const nextSlides = this.buildSlides(movies, slideLength)
    //   console.log('nextSlides: ' + JSON.stringify(nextSlides))

    //   this.setState({
    //     suggestions: nextSuggestions,
    //     slides: nextSlides
    //   })
    // }
  }

  componentDidUpdate() {
    console.log('SearchResults Updated')
    console.log(this.state)
  }

  renderSuggestions = (suggestions) => {
    if (suggestions.length === 0) return null

    return suggestions.map((suggestion, index) =>
      <li key={index}>
        <Link to={suggestion.link}>{suggestion.name}</Link>
      </li>
    )
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
