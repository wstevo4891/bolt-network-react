import LinkedList from './LinkedList'

const SLIDE_SIZE_MAP = {
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
    return this.buildList()
  }

  sliceMovies(movies) {
    if (this.slideLength === 6) return movies

    const slideSize = SLIDE_SIZE_MAP[this.slideLength]

    return movies.slice(0, slideSize)
  }

  buildList() {
    if (this.movies === null || this.movies.length <= 1) return []

    const list = new LinkedList()

    this.addSlidesToList(list)

    return list
  }

  addSlidesToList(list) {
    let count = 0
    let slide = []

    for (let movie of this.movies) {
      slide.push(movie)
      count++

      if (count === this.slideLength) {
        list.add(slide)
        slide = []
        count = 0
      }
    }
  }
}
