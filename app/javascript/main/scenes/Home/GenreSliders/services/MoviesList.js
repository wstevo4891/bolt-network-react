// app/javascript/genre_sliders_plus/services/MoviesList.js

import LinkedList from '../structures/LinkedList';

// Service for building linked list of movie objects
export default class MoviesList {
  constructor(props) {
    this.movies = props.movies
    this.slideLength = props.slideLength
    this.last = props.movies.length
    this.list = new LinkedList()
    this.slideIndex = 1
    this.movieIndex = 0
    this.arr = []
  }

  call = () => {
    // console.log('Movies List')
    // console.log(this.movies)

    if (this.movies === null || this.movies.length <= 1) return []

    for (let movie of this.movies) {
      this.arr.push(movie)
      this.movieIndex++
  
      if (this.movieIndex === this.last) {
        this.list.add(this.arr)
        return this.list
  
      } else if (this.slideIndex < this.slideLength) {
        this.slideIndex++
  
      } else {
        this.list.add(this.arr)
        this.arr = []
        this.slideIndex = 1
      }
    }
  }
}
