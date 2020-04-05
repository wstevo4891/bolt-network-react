// app/javascript/main/scenes/services/StaticSlides.js

export default class StaticSlides {
  constructor(movies, slideLength) {
    this.movies = movies
    this.limit = slideLength
    this.slides = []
  }

  call() {
    if (this.movies === null || this.movies.length === 0) return []

    this.buildSlides()

    return this.slides
  }

  buildSlides() {
    let arr
    let i = 0

    while(i < this.movies.length) {
      arr = this.movies.slice(i, i += this.limit)

      this.slides.push(arr)
    }
  }
}
