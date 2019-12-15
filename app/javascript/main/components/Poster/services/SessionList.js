// app\javascript\main\components\Poster\services\SessionListService.js

/**
 * @class SessionListService
 * 
 * @description Access a list in sessionStorage.
 * Find, add, or remove objects in the list.
 */
class SessionList {
  constructor(movie, listName) {
    this.movie = movie
    this.listName = listName
    this.list = this.initList()
  }

  initList() {
    const list = JSON.parse(sessionStorage.getItem(this.listName))

    return list === null ? {} : list
  }

  findMovie() {
    return this.list[this.movie.id] ? true : false
  }

  add() {
    const found = this.findMovie()

    if (found) {
      console.log(`Movie is already in the ${this.listName}`)

    } else {
      this.list[this.movie.id] = this.movie

      sessionStorage.setItem(this.listName, JSON.stringify(this.list))

      console.log(`Movie added to ${this.listName}`)
    }
  }

  remove() {
    delete this.list[this.movie.id]

    sessionStorage.setItem(this.listName, JSON.stringify(this.list))

    console.log(`Movie was removed from ${this.listName}`)
  }
}

export class LikedList extends SessionList {
  constructor(movie) {
    super(movie, 'LikedList')
  }
}

export class UnlikedList extends SessionList {
  constructor(movie) {
    super(movie, 'UnlikedList')
  }
}
