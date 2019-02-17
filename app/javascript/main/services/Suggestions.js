// app/javascript/main/services/Suggestions.js

export default class Suggestions {
  constructor(genres, movies) {
    this.genres = genres
    this.movies = movies
  }

  call = () => {
    if (this.genres.length > 0) {
      return this.fullSuggestions()
    } else {
      return this.movieLinks()
    }
  }

  fullSuggestions = () => {
    const genres = this.genreLinks()

    return genres.concat(this.movieLinks())
  }

  genreLinks = () => {
    return this.genres.map((genre) => {
      return { name: genre.name, link: genre.url }
    })
  }

  movieLinks = () => {
    return this.movies.map((movie) => {
      return { name: movie.title, link: movie.url }
    })
  }
}
