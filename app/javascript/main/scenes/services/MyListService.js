// app/javascript/main/scenes/services/MyListService.js

import API from '../../services/API'

export default class MyListService {
  constructor(movieId) {
    this.movieId = movieId
    this.list = JSON.parse(localStorage.getItem('MyList'))
  }

  add = () => {
    if (this.list === null) {
      this.list = []
    }

    return this.addMovie()
  }

  remove = () => {
    for (let item of this.list) {
      if (item.id === this.movieId) {
        const index = this.list.indexOf(item)

        this.list.splice(index, 1)
        break
      }
    }

    localStorage.setItem('MyList', JSON.stringify(this.list))

    console.log('Movie was removed from your list')

    return true
  }

  addMovie = () => {
    API.movies.show(this.movieId)
      .then(response => {
        // console.log('MyList Movie')
        // console.log(response.data)

        const movie = response.data

        const found = this.findMovie(movie.id)

        if (found === false) {
          this.list.push(response.data)

          localStorage.setItem('MyList', JSON.stringify(this.list))

          console.log('Movie added to your list')
        } else {
          console.log('This movie is already in your list')
        }

        return true
      })
      .catch(error => {
        console.error('Error in MyListService.addMovie')
        console.error(error)
      })
  }

  findMovie = (movieId) => {
    if (this.list.length === 0) return false

    let found = false

    for (let item of this.list) {
      if (item.id === movieId) {
        found = true
      }
    }

    return found
  }
}

