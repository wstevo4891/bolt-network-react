// PosterData Class

export default class PosterData {
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
