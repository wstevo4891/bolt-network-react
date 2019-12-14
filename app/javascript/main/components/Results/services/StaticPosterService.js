// Static Poster Service

function HoverStyle(value) {
  this.transform = value || 'translate3d(0px, 0px, 0px)'
  this.transitionDuration = '400ms'
  this.transitionTimingFunction = 'cubic-bezier(0.5, 0, 0.1, 1)'
  this.transitionDelay = '0ms'
}

export default class StaticPosterService {
  constructor(props) {
    this.index = props.index
    this.slideLength = props.slideLength
    this.end = props.slideLength - 1
    this.hoverItem = props.hoverItem
  }

  containerClass = () => {
    return `poster-container slide-item-${this.index}`
  }

  posterStyle = () => {
    if (this.hoverItem === null) return new HoverStyle()

    this.translateX = this.calcTranslateX()

    const transformValue = this.posterTransform()

    return new HoverStyle(transformValue)
  }

  calcTranslateX = () => {
    const posters = document.getElementsByClassName('poster-container')
    const width = posters[0].clientWidth
    return Math.round(width * 0.38)
  }

  posterTransform = () => {
    if (this.index < this.hoverItem) {  
      return this.negativeTranslate()
  
    } else if (this.index === this.hoverItem) {
      return this.currentPositionStyle()
  
    } else if (this.index > this.hoverItem) {  
      return this.afterHoverStyle()
    }
  }
  
  currentPositionStyle = () => {
    if (this.index === 0) {
      const translateHalf = Math.floor((this.translateX / 2) + 5)
      return this.translate3D(translateHalf, true)
  
    } else if (this.index === this.end) {
      const translateHalf = Math.floor((this.translateX / 2) + 8);
      return this.translate3D(-translateHalf, true)
  
    } else {
      return this.translate3D(0, true)
    }
  }
  
  afterHoverStyle = () => {
    if (this.hoverItem === 0 || this.hoverItem === this.end) {
      return this.translate3D(this.translateX * 2)
  
    } else {
      return this.translate3D(this.translateX)
    }
  }

  negativeTranslate = () => {
    if (this.hoverItem === this.end) {
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
