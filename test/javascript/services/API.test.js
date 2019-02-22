// test/javascript/services/API.test.js

import API from 'main_two/API'

test('can get movies by genre', () => {
  let movies
  API.movies.byGenre(3)
    .then(response => {
      console.log(response.data)
      movies = response.data
    })
    .catch(error => {
      console.error(error)
    })

  console.log(movies)
})
