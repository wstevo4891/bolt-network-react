// Poster Data Service

import {
  ContainerFactory,
  HoverStyleFactory,
  PosterParamsFactory,
} from './services'

const PosterDataFactory = (props) => {
  const params = PosterParamsFactory(props)

  return {
    hoverItem: params.hoverItem,

    containerFactory: ContainerFactory(params),

    styleFactory: HoverStyleFactory(params),

    build(movie, index) {
      // console.log('PosterDataFactory.build()')

      const containerClass = this.containerFactory.build(index)

      const containerStyle = this.styleFactory.build(index)

      return this.posterData(movie, containerClass, containerStyle)
    },

    posterData(movie, containerClass, containerStyle) {
      const data = {
        containerStyle,
        movie,
        hoverItem: this.hoverItem,
        posterImage: {
          backgroundImage: `url(${movie.photo.url})`,
          backgroundSize: '100% 100%',
        },
        slideItem: parseInt(containerClass.slice(-1), 10),
      }
    
      if (data.slideItem === data.hoverItem) containerClass += ' mouseOver'
    
      data.containerClass = containerClass
    
      return data
    }
  }
}

export default PosterDataFactory
