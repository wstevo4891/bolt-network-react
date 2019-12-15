// MyListService.js

export default class MyListService {
  constructor(movie) {
    this.movie = movie
    this.list = this.setList()
  }

  setList() {
    const list = JSON.parse(sessionStorage.getItem('MyList'))
    
    return list === null ? {} : list
  }

  add() {
    this.list[this.movie.id] = this.movie

    sessionStorage.setItem('MyList', JSON.stringify(this.list))

    console.log('Movie added to your list')

    return true
  }

  remove() {
    delete this.list[this.movie.id]

    sessionStorage.setItem('MyList', JSON.stringify(this.list))

    console.log('Movie was removed from your list')

    return true
  }

  findMovie() {
    return this.list[this.movie.id] ? true : false
  }
}
