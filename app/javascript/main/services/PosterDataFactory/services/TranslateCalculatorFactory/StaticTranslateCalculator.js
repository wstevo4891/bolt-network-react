// Static Poster Translate Calculator

const POSTER_WIDTH_MULTIPLIER = 0.38

export default class StaticTranslateCalculator {
  constructor(params) {
    this.end = params.end
    this.hoverItem = params.hoverItem
    this.slideLength = params.slideLength
    this.translateX = this.calcTranslateX()
  }

  calcTranslateX() {
    const posters = document.getElementsByClassName('poster-container')

    if (posters.length === 0) return 0

    const width = posters[0].clientWidth

    return Math.round(width * POSTER_WIDTH_MULTIPLIER)
  }

  call(index) {
    if (index < this.hoverItem) {  
      return this.negativeTranslate()
  
    } else if (index === this.hoverItem) {
      return this.currentPositionTranslate(index)
  
    } else if (index > this.hoverItem) {  
      return this.afterHoverTranslate()
    }
  }

  negativeTranslate() {
    if (this.hoverItem === this.end) {
      return this.translate3D(-this.translateX * 2)
    } else {
      return this.translate3D(-this.translateX)
    }
  }

  currentPositionTranslate(index) {
    const translate = this.calcCurrentTranslate(index)

    return this.translate3D(translate, true)
  }

  calcCurrentTranslate(index) {
    if (index === 0) {
      return Math.floor((this.translateX / 2) + 5)
  
    } else if (index === this.end) {
      return -Math.floor((this.translateX / 2) + 8)
  
    } else return 0
  }
  
  afterHoverTranslate() {
    if (this.hoverItem === 0 || this.hoverItem === this.end) {
      return this.translate3D(this.translateX * 2)
  
    } else {
      return this.translate3D(this.translateX)
    }
  }

  translate3D(x, scale = false) {
    if (scale) {
      return `scale(1.75) translate3d(${x}px, 0px, 0px)`
    } else {
      return `translate3d(${x}px, 0px, 0px)`
    }
  }
}
