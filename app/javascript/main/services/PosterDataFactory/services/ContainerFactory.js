// Poster Container Class Factory

export default class ContainerFactory {
  constructor(params) {
    this.type = params.type
    this.start = params.start
    this.slideLength = params.slideLength
    this.limit = params.limit
  }

  build(index) {
    if (this.type === 'static') {
      return `poster-container slide-item-${index}`

    } else {
      return this.sliderPosterContainer(index)
    }
  }

  sliderPosterContainer(index) {
    if (this.start) return this.startContainer(index)

    if (index >= this.slideLength && index <= this.limit) {

      return `poster-container slide-item-${index - this.slideLength}`

    } else {
      return 'poster-container slider-item-'
    }
  }

  startContainer(index) {
    if (index <= this.slideLength) {
      return `poster-container slide-item-${index}`
    } else {
      return 'poster-container slider-item-'
    }
  }
}
