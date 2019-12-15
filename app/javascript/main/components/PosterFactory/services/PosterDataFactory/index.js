// Poster Data Service

import PosterParamsFactory from './services/PosterParamsFactory'

import ContainerFactory from './services/ContainerFactory'

import HoverStyleFactory from './services/HoverStyleFactory'

class PosterData {
  constructor(movie, hoverItem) {
    this.movie = movie
    this.posterImage = {
      backgroundImage: `url(${movie.photo.url})`,
      backgroundSize: '100% 100%'
    }
    this.hoverItem = hoverItem
  }

  addContainerClass(container) {
    this.slideItem = parseInt(container.slice(-1), 10)

    if (this.slideItem === this.hoverItem) container += ' mouseOver'

    this.containerClass = container
  }
}

export default class PosterDataFactory {
  constructor(props) {
    const params = PosterParamsFactory.build(props)

    this.hoverItem = params.hoverItem

    this.containerFactory = new ContainerFactory(params)

    this.styleFactory = new HoverStyleFactory(params)
  }

  build(movie, index) {
    const data = new PosterData(movie, this.hoverItem)

    const container = this.containerFactory.call(index)

    data.addContainerClass(container)

    data.containerStyle = this.styleFactory.build(index)

    return data
  }
}
