/**
 * @class SessionListService
 * 
 * @description Access a list in sessionStorage.
 * Find, add, or remove objects in the list.
 */
export default class SessionList {
  constructor(movie, listName) {
    this.movie = movie
    this.listName = listName
  }

  getList() {
    const list = JSON.parse(sessionStorage.getItem(this.listName))

    return list === null ? {} : list
  }

  findMovie() {
    const list = this.getList()

    return list[this.movie.id] ? true : false
  }

  add() {
    const list = this.getList()

    list[this.movie.id] = this.movie

    sessionStorage.setItem(this.listName, JSON.stringify(list))

    console.log(`Movie was added to ${this.listName}`)
  }

  remove() {
    const list = this.getList()

    delete list[this.movie.id]

    sessionStorage.setItem(this.listName, JSON.stringify(list))

    console.log(`Movie was removed from ${this.listName}`)
  }
}
