// app/javascript/main/components/SearchResults

import React from 'react'

import Suggestions from '../services/Suggestions'
import PosterRow from './PosterRow'

const SearchResults = (props) => {
  const genres = props.results.genres
  const movies = props.results.movies
  const suggestions = new Suggestions(genres, movies).call

  const buildSlides = (items, limit) => {
    let slides = []
    let counter = 0
    let arr = []

    for (let item of items) {

      if (counter < limit) {
        arr.push(item)
        counter++
      } else {
        slides = slides.concat(arr)
        counter = 0
        arr = []
      }
    }

    return slides
  }

  const slides = buildSlides(movies, props.slideLength)

  return(
    <div className="search-results">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="suggestions">
              <span className="suggestionsLabel">Explore titles related to:</span>
              <ul>
                {suggestions.map((suggestion, index) =>
                  <li key={index}>
                    <a href={suggestion.link}>{suggestion.name}</a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            {slides.map((slide, index) =>
              <PosterRow key={index} movies={slide} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchResults
