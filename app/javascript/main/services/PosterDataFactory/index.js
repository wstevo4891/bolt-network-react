import ContainerData from './ContainerData'
import posterParamsFactory from './posterParamsFactory'

export default function posterDataFactory(movie, index, factoryProps) {
  const params = posterParamsFactory(factoryProps)

  return {
    containerData: new ContainerData(index, params),
    hoverItem: params.hoverItem,
    movie,
    posterImage: {
      backgroundImage: `url(${movie.photo.url})`,
      backgroundSize: '100% 100%',
    },
  }
}
