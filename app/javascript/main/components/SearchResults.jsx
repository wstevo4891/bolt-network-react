// app/javascript/main/components/SearchResults

import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Suggestions from '../services/Suggestions'
import PosterRow from './PosterRow'

export default class SearchResults extends Component {
  constructor(props) {
    super(props)
    this.state = {
      genres: props.results.genres,
      movies: props.results.movies,
      slideLength: props.slideLength,
      suggestions: [],
      slides: []
    }
  }

  componentWillReceiveProps(nextProps) {
    const { results, slideLength } = nextProps

    const genres = results.genres
    const movies = results.movies

    const nextSuggestions = new Suggestions(genres, movies).call()
    console.log('nextSuggestions: ' + JSON.stringify(nextSuggestions))

    const nextSlides = this.buildSlides(movies, slideLength)
    console.log('nextSlides: ' + JSON.stringify(nextSlides))

    this.setState({
      genres: nextProps.results.genres,
      movies: nextProps.results.movies,
      slideLength: nextProps.slideLength,
      suggestions: nextSuggestions,
      slides: nextSlides
    })
  }

  render() {
    const { slideLength, suggestions, slides } = this.state

    return(
      <div className="search-results">
        <div className="display-container">
          <div className="row">
            <div className="col-12">
              <div className="suggestions">
                <span className="suggestionsLabel">Explore titles related to:</span>
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

  componentDidMount() {
    console.log('SearchResults Mounted')
    console.log(this.state)

    const { genres, movies, slideLength, suggestions, slides } = this.state

    if (suggestions.length === 0 && slides.length === 0) {
      const nextSuggestions = new Suggestions(genres, movies).call()
      console.log('nextSuggestions: ' + JSON.stringify(nextSuggestions))

      const nextSlides = this.buildSlides(movies, slideLength)
      console.log('nextSlides: ' + JSON.stringify(nextSlides))

      this.setState({
        suggestions: nextSuggestions,
        slides: nextSlides
      })
    }
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

  componentDidUpdate() {
    console.log('SearchResults Updated')
    console.log(this.state)
  }
}
