import { ContainerData, PosterParamsFactory } from './services'

export default function PosterDataFactory(movie, index, factoryProps) {
  const params = PosterParamsFactory(factoryProps)

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
