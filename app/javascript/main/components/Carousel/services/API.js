// app/javascript/main_two/api.js

// Carousel Movies API

export default {
  movies: {
    search: (titles) => {
      return fetch('/api/movies/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ titles: titles })
      })
    }
  }
}
