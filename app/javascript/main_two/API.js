// app/javascript/main_two/api.js

import axios from 'axios'

export default {
  genres: {
    index: () => axios.get('/api/genres'),

    show: (genreId) => axios.get(`/api/genres/${genreId}`)
  },

  movies: {
    index: () => axios.get('/api/movies'),

    show: (movieId) => axios.get(`/api/movies/${movieId}`),

    byGenre: (genreId) => axios.get(`/api/movies/by-genre/${genreId}`),

    search: (titles) => axios.post('/api/movies/search', { titles: titles })
  },

  moviesIndex: {
    get: (slideLength) => axios.get(`/api/movies-index/${slideLength}`)
  },

  search: {
    show: (query) => axios.get(`/api/search?query=${query}`)
  }
}
