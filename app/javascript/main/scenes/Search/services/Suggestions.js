// app/javascript/main/scenes/Search/services/Suggestions.js

export default class Suggestions {
  constructor(props) {
    this.query = props.query
    this.genres = props.genres
    this.people = props.people
    this.movies = props.movies.slice(0, 6)
  }

  call() {
    return this.genreLinks()
      .concat(this.peopleLinks())
      .concat(this.movieLinks())
  }

  genreLinks() {
    if (this.genres.length === 0) return []

    return this.genres.map(genre => {
      return {
        name: genre.alias,
        link: `/search?q=${this.query}&suggestionId=${genre.suggestionId}`
      }
    })
  }

  peopleLinks() {
    if (this.people.length === 0) return []

    return this.people.map(person => {
      return {
        name: person.name,
        link: `/search?q=${this.query}&suggestionId=${person.suggestionId}`
      }
    })
  }

  movieLinks() {
    if (this.movies.length === 0) return []

    return this.movies.map(movie => {
      return {
        name: movie.title,
        link: `/search?q=${this.query}&suggestionId=${movie.suggestionId}`
      }
    })
  }
}
