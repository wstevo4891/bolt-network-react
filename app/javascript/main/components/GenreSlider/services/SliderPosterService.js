// Slider Poster Service

function HoverStyle(value) {
  this.transform = value || 'translate3d(0px, 0px, 0px)'
  this.transitionDuration = '400ms'
  this.transitionTimingFunction = 'cubic-bezier(0.5, 0, 0.1, 1)'
  this.transitionDelay = '0ms'
}

export default class SliderPosterService {
  constructor(props) {
    this.start = props.start
    this.index = props.index
    this.slideLength = props.slideLength
    this.limit = (props.slideLength * 2) + 1
    this.hoverItem = props.hoverItem
  }

  containerClass = () => {
    if (this.start && this.index <= this.slideLength) {

      return `poster-container slide-item-${this.index}`

    } else if (
      this.index >= this.slideLength &&
      this.index <= this.limit
    ) {

      const diff = this.index - this.slideLength
      return `poster-container slide-item-${diff}`

    } else return 'poster-container slider-item-'
  }

  // containerClass = () => {
  //   if (this.start) {
  //     if (this.index <= this.slideLength) {
  //       return `poster-container slide-item-${this.index}`
  //     } else {
  //       return 'poster-container slider-item-'
  //     }

  //   } else {
  //     if (this.index >= this.slideLength && this.index <= this.limit) {
  //       const diff = this.index - this.slideLength
  //       return `poster-container slide-item-${diff}`

  //     } else {
  //       return 'poster-container slider-item-'
  //     }
  //   }
  // }

  posterStyle = () => {
    if (this.hoverItem === null) return new HoverStyle()

    this.translateX = this.calcTranslateX()

    this.hover = this.start ? this.hoverItem : this.hoverItem + this.slideLength

    this.end = this.start ? this.slideLength : this.limit

    const transformValue = this.posterTransform()

    return new HoverStyle(transformValue)
  }

  calcTranslateX = () => {
    const posters = document.getElementsByClassName('poster-container')

    const width = posters[0].clientWidth

    return Math.round(width * 0.38)
  }

  posterTransform = () => {
    if (this.index < this.hover) {
      if (
        this.start === false &&
        this.hover === this.slideLength + 1
      ) return null
  
      return this.negativeTranslate()
  
    } else if (this.index === this.hover) {
      return this.currentPositionStyle()
  
    } else if (this.index > this.hover) {
      if (this.hover === this.end - 1) return null
  
      return this.afterHoverStyle()
    }
  }
  
  currentPositionStyle = () => {
    if (
      (this.start && this.index === 0) ||
      this.index === this.slideLength + 1
    ) {
      const translateHalf = Math.floor((this.translateX / 2) + 5)

      return this.translate3D(translateHalf, true)
  
    } else if (this.index === this.end - 1) {

      const translateHalf = Math.floor((this.translateX / 2) + 8)

      return this.translate3D(-translateHalf, true)
  
    } else {
      return this.translate3D(0, true)
    }
  }
  
  afterHoverStyle = () => {
    if (
      (this.start && this.hover === 0) ||
      this.hover === this.slideLength + 1
    ) return this.translate3D(this.translateX * 2)
  
    return this.translate3D(this.translateX)
  }

  negativeTranslate = () => {
    if (this.hover === this.end - 1) {
      return this.translate3D(-this.translateX * 2)
    } else {
      return this.translate3D(-this.translateX)
    }
  }

  translate3D = (x, scale = false) => {
    if (scale) {
      return `scale(1.75) translate3d(${x}px, 0px, 0px)`
    } else {
      return `translate3d(${x}px, 0px, 0px)`
    }
  }
}
