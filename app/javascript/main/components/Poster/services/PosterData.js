// Poster Data Service

export default class PosterData {
  constructor(props) {
    this.movie = props.movie
    this.hoverItem = props.hoverItem
    this.service = new props.service(props)
  }

  call = () => {
    let containerClass = this.service.containerClass()

    const slideItem = parseInt(containerClass.slice(-1), 10)

    if (slideItem === this.hoverItem) containerClass += ' mouseOver'

    const containerStyle = this.service.posterStyle()

    const posterImage = {
      backgroundImage: `url(${this.movie.photo.url})`,
      backgroundSize: '100% 100%'
    }

    return {
      slideItem,
      containerClass,
      containerStyle,
      posterImage
    }
  }
}
