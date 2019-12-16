// Poster Container Class Factory

export default class ContainerFactory {
  constructor(params) {
    this.params = params
  }

  build(index) {
    if (this.params.type === 'static') {
      return `poster-container slide-item-${index}`

    } else {
      return this.sliderPosterContainer(index)
    }
  }

  sliderPosterContainer(index) {
    const { start, slideLength, limit } = this.params

    if (start) {
      if (index <= slideLength) {
        return `poster-container slide-item-${index}`
      } else {
        return 'poster-container slider-item-'
      }

    } else if (index >= slideLength && index <= limit) {

      return `poster-container slide-item-${index - slideLength}`

    } else {
      return 'poster-container slider-item-'
    }
  }
}
