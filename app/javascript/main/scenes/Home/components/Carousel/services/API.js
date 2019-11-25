// app/javascript/main_two/api.js

// Carousel Movies API

const URI = 'http://localhost:3001/api/v1/movies/search'

export default {
  movies: {
    search: (titles) => {
      return fetch(URI, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ titles: titles })
      })
    }
  }
}
