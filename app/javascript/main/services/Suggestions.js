// app/javascript/main/services/Suggestions.js

export default class Suggestions {
  constructor(genres, movies) {
    this.genres = genres
    this.movies = movies
  }

  call = () => {
    if (this.genres.length > 0) {
      this.fullSuggestions()
    } else {
      this.movieLinks()
    }
  }

  fullSuggestions = () => {
    const genres = this.genreLinks()

    genres.concat(this.movieLinks())
  }

  genreLinks = () => {
    this.genres.map((genre) => {
      return { name: genre.name, link: genre.url }
    })
  }

  movieLinks = () => {
    this.movies.map(() => {
      return { name: movie.title, link: movie.url }
    })
  }
}
