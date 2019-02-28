// app/javascript/main/scenes/services/LikeButtonService.js

export default class LikeButtonService {
  constructor(movie) {
    this.movie = movie
    this.list = JSON.parse(localStorage.getItem('LikedList'))
  }

  add = () => {
    if (this.list === null) this.list = []

    const found = this.findMovie()

    if (found === false) {
      return this.addToList()
    } else {
      console.log('This movie is already liked')
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

    localStorage.setItem('LikedList', JSON.stringify(this.list))

    console.log('Movie was removed from Liked')

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

    localStorage.setItem('LikedList', JSON.stringify(this.list))

    console.log('Movie Liked')

    return true
  }
}

