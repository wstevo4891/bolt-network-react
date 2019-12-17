// app/javascript/genre_sliders_plus/services/SlidesArray.js

/**
 * Builds Array of movie objects for slider content
 * 
 * @param {Object} props
 * 
 * @property {Boolean} start
 * @property {LinkedList} list
 * @property {Number} position
 * @property {Array} slides
 */
export default class SlidesArray {
  constructor(props) {
    this.start = props.start
    this.list = props.moviesList
    this.position = props.position
    this.slides = []
  }

  call() {
    if (this.start) {
      this.startSlides()
    } else {
      this.nextSlides()
    }

    return this.slides
  }

  startSlides() {
    let current = this.list.head
    let count = 0

    while (count < 2) {
      this.slides = this.slides.concat(current.data)
      count++
      current = current.next
    }

    this.slides.push(current.data[0])
  }

  nextSlides() {
    if (this.position === 1) {
      this.addSlides(this.list.tail)

    } else if (this.position === this.list._length) {
      this.addSlides(this.list.tail.previous)
  
    } else {
      this.midPositionSlides()
    }
  }

  addSlides(current) {
    const leftEnd = current.previous || this.list.tail
    let count = 0

    this.slides.push(leftEnd.last())

    while (count < 3) {
      this.slides = this.slides.concat(current.data)
      count++
      current = current.next || this.list.head
    }

    this.slides.push(current.data[0])
  }

  midPositionSlides() {
    let current = this.list.searchNodeAt(this.position)

    current = current.previous || this.list.tail

    this.addSlides(current)
  }
}
