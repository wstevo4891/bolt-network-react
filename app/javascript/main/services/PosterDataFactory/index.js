// Poster Data Service

import PosterParamsFactory from './services/PosterParamsFactory'
import PosterData from './services/PosterData'
import ContainerFactory from './services/ContainerFactory'
import HoverStyleFactory from './services/HoverStyleFactory'

export default class PosterDataFactory {
  constructor(props) {
    const params = PosterParamsFactory.build(props)

    this.hoverItem = params.hoverItem

    this.containerFactory = new ContainerFactory(params)

    this.styleFactory = new HoverStyleFactory(params)
  }

  build(movie, index) {
    const data = new PosterData(movie, this.hoverItem)

    const container = this.containerFactory.build(index)

    data.addContainerClass(container)

    data.containerStyle = this.styleFactory.build(index)

    return data
  }
}
