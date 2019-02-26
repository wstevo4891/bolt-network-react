// app/javascript/main/scenes/Home/GenreSliders/services/SliderPosterService.js

export default class SliderPosterService {
  constructor(props) {
    this.start = props.start
    this.index = props.index
    this.slideLength = props.slideLength
    this.limit = (props.slideLength * 2) + 1
    this.hoverItem = props.hoverItem
    this.hoverStyle = {
      transform: 'translate3d(0px, 0px, 0px)',
      transitionDuration: '400ms',
      transitionTimingFunction: 'cubic-bezier(0.5, 0, 0.1, 1)',
      transitionDelay: '0ms'
    }
  }

  containerClass = () => {
    if (this.start) {
      if (this.index <= this.slideLength) {
        return `poster-container slide-item-${this.index}`
      } else {
        return 'poster-container slider-item-'
      }

    } else {
      if (this.index >= this.slideLength && this.index <= this.limit) {
        const diff = this.index - this.slideLength
        return `poster-container slide-item-${diff}`

      } else {
        return 'poster-container slider-item-'
      }
    }
  }

  posterStyle = () => {
    if (this.hoverItem === null) return this.hoverStyle

    this.translateX = this.calcTranslateX()
    this.hover = this.start ? this.hoverItem : this.hoverItem + this.slideLength
    this.end = this.start ? this.slideLength : this.limit

    return this.buildPosterStyle()
  }

  calcTranslateX = () => {
    const width = document.getElementsByClassName('poster-container')[0].clientWidth
    return Math.round(width * 0.47)
  }

  buildPosterStyle = () => {
    if (this.index < this.hover) {
      if (this.start === false && this.hover === this.slideLength + 1) return this.hoverStyle
  
      this.hoverStyle.transform = this.negativeTranslate()
  
    } else if (this.index === this.hover) {
      this.currentPositionStyle()
  
    } else if (this.index > this.hover) {
      if (this.hover === this.end - 1) return this.hoverStyle
  
      this.afterHoverStyle()
    }
  
    return this.hoverStyle
  }
  
  currentPositionStyle = () => {
    if ((this.start && this.index === 0) || this.index === this.slideLength + 1) {
      const translateHalf = Math.floor((this.translateX / 2) + 5)
      this.hoverStyle.transform = this.translate3D(translateHalf, true)
  
    } else if (this.index === this.end - 1) {
      const translateHalf = Math.floor((this.translateX / 2) + 8)
      this.hoverStyle.transform = this.translate3D(-translateHalf, true)
  
    } else {
      this.hoverStyle.transform = this.translate3D(0, true)
    }
  }
  
  afterHoverStyle = () => {
    if ((this.start && this.hover === 0) || this.hover === this.slideLength + 1) {
      this.hoverStyle.transform = this.translate3D(this.translateX * 2)
  
    } else {
      this.hoverStyle.transform = this.translate3D(this.translateX)
    }
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
      return `scale(2) translate3d(${x}px, 0px, 0px)`
    } else {
      return `translate3d(${x}px, 0px, 0px)`
    }
  }
}
