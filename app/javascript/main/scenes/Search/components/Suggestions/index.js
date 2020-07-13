import React, { Component } from 'react'
import PropTypes from 'prop-types'

import SuggestionsList from './SuggestionsList'

export default class Suggestions extends Component {
  render() {
    const suggestions = this.buildSuggestionsArray()

    return (
      <div className="col-12">
        <div className="suggestions">
          <span className="suggestionsLabel">
            Explore titles related to:&nbsp;
          </span>

          <SuggestionsList
            handleClick={this.props.handleClick}
            suggestions={suggestions}
          />
        </div>
      </div>
    )
  }

  buildSuggestionsArray() {
    return this.genreLinks()
      .concat(this.peopleLinks())
      .concat(this.movieLinks())
  }

  suggestionLink(id) {
    return `/search?q=${this.props.query}&suggestionId=${id}`
  }

  genreLinks() {
    const genres = this.props.genres
    if (genres.length === 0) return []

    return genres.map(genre => ({
      name: genre.alias,
      link: this.suggestionLink(genre.suggestionId)
    }))
  }

  peopleLinks() {
    const people = this.props.people
    if (people.length === 0) return []

    return people.map(person => ({
      name: person.name,
      link: this.suggestionLink(person.suggestionId)
    }))
  }

  movieLinks() {
    const movies = this.props.movies.slice(0, 6)
    if (movies.length === 0) return []

    return movies.map(movie => ({
      name: movie.title,
      link: this.suggestionLink(movie.suggestionId)
    }))
  }
}

Suggestions.propTypes = {
  handleClick: PropTypes.func.isRequired,
  genres: PropTypes.array,
  movies: PropTypes.array,
  people: PropTypes.array,
  query: PropTypes.string,
}

Suggestions.defaultProps = {
  genres: [],
  movies: [],
  people: [],
  query: null,
}
