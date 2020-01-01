// app/javascript/genre_sliders_plus/services/MoviesList.js

import LinkedList from '../structures/LinkedList'

const LENGTH_MAP = {
  6: 24,
  5: 20,
  4: 20,
  3: 18,
  2: 12
}

/**
 * @class MoviesList
 * 
 * @description Service for building linked list of slides
 * for GenreSlider. Each slide is an array of movie objects.
 * 
 * @param {Object} props
 * 
 * @property {Integer} slideLength
 * @property {Array<Object>} movies
 * @property {LinkedList<Node>} list
 */
export default class MoviesList {
  constructor(slideLength, movies) {
    this.slideLength = slideLength
    this.movies = this.sliceMovies(movies)
    this.list = new LinkedList()
  }

  sliceMovies(movies) {
    if (this.slideLength === 6) return movies

    const lastIndex = LENGTH_MAP[this.slideLength]

    return movies.slice(0, lastIndex)
  }

  call() {
    if (this.movies === null || this.movies.length <= 1) return []

    this.buildList()

    return this.list
  }

  buildList() {
    let slideCount = 0
    let slide = []

    for (let movie of this.movies) {
      slide.push(movie)
      slideCount++

      if (slideCount === this.slideLength) {
        this.list.add(slide)
        slide = []
        slideCount = 0
      }
    }
  }
}
