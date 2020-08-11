// Poster Data Service

import {
  ContainerFactory,
  HoverStyleFactory,
  PosterParamsFactory,
} from './services'

function posterData(hoverItem, movie, containerClass, containerStyle) {
  const data = {
    containerStyle,
    movie,
    hoverItem,
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

export default function PosterDataFactory(movie, index, props) {
  const params = PosterParamsFactory(props)

  const containerClass = ContainerFactory(index, params)

  const containerStyle = HoverStyleFactory(index, params)

  return posterData(params.hoverItem, movie, containerClass, containerStyle)
}
