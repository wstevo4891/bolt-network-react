// app/javascript/main/scenes/services/UnlikeButtonService.js

export default class UnlikeButtonService {
  constructor(movie) {
    this.movie = movie
    this.list = JSON.parse(sessionStorage.getItem('UnlikeList'))
  }

  add = () => {
    if (this.list === null) this.list = []

    const found = this.findMovie()

    if (found === false) {
      return this.addToList()
    } else {
      console.log('This movie is already in your list')
      return true
    }
  }

  remove = () => {
    for (let item of this.list) {
      if (item.id === this.movie.id) {
        const index = this.list.indexOf(item)

        this.list.splice(index, 1)
        break
      }
    }

    sessionStorage.setItem('UnlikeList', JSON.stringify(this.list))

    console.log('Movie was removed from Unliked')

    return true
  }

  findMovie = () => {
    if (this.list === null || this.list.length === 0) return false

    let found = false

    for (let item of this.list) {
      if (item.id === this.movie.id) {
        found = true
      }
    }

    return found
  }

  addToList = () => {
    this.list.push(this.movie)

    sessionStorage.setItem('UnlikeList', JSON.stringify(this.list))

    console.log('Movie Unliked')

    return true
  }
}

