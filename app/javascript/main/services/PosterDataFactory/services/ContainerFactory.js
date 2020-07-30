// Poster Container Class Factory

const CONTAINER_CLASS = 'poster-container slide-item-'

const ContainerBuilder = {
  type: null,
  start: null,
  slideLength: null,
  limit: null,

  build(index) {
    if (this.type === 'static') {
      return CONTAINER_CLASS + index

    } else {
      return this.sliderPosterContainer(index)
    }
  },

  sliderPosterContainer(index) {
    if (this.start) return this.startContainer(index)

    if (index >= this.slideLength && index <= this.limit) {
      return CONTAINER_CLASS + (index - this.slideLength)
    }
    
    return CONTAINER_CLASS
  },

  startContainer(index) {
    if (index <= this.slideLength) {
      return CONTAINER_CLASS + index
    } else {
      return CONTAINER_CLASS
    }
  },
}

export default function ContainerFactory(params) {
  return Object.assign({}, ContainerBuilder, params)
}
