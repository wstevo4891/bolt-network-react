// Slider Translate Calculator

import TranslateCalculator from './TranslateCalculator'

class SliderTranslateCalculator extends TranslateCalculator {
  constructor(params) {
    super(params)
    this.start = params.start
    this.limit = params.limit
    this.end = this.start ? this.slideLength : this.limit
    this.hover = this.start ? this.hoverItem : this.hoverItem + this.slideLength
  }

  call(index) {
    if (index < this.hover) {
      return this.beforeHoverTranslate()
  
    } else if (index === this.hover) {
      return this.currentPositionTranslate(index)
  
    } else if (index > this.hover) {
      return this.afterHoverTranslate()
    }
  }

  beforeHoverTranslate() {
    if (
      this.start === false &&
      this.hover === this.slideLength + 1
    ) return null

    return this.negativeTranslate()
  }

  negativeTranslate() {
    if (this.hover === this.end - 1) {
      return this.translate3D(-this.translateX * 2)
    } else {
      return this.translate3D(-this.translateX)
    }
  }
  
  currentPositionTranslate(index) {
    const translate = this.calcCurrentTranslate(index)

    return this.translate3D(translate, true)
  }

  /**
   * Check if current poster is at the start or
   * end of its list.
   * @function bookEndPosition
   * 
   * @param {Number} position
   * 
   * @returns {Boolean}
   */
  bookEndPosition(position) {
    return (this.start && position === 0) || position === this.slideLength + 1
  }

  calcCurrentTranslate(index) {
    if (this.bookEndPosition(index)) {
      return Math.floor((this.translateX / 2) + 5)
  
    } else if (index === this.end - 1) {

      return -Math.floor((this.translateX / 2) + 8)
  
    } else return 0
  }
  
  afterHoverTranslate() {
    if (this.hover === this.end - 1) return null

    if (this.bookEndPosition(this.hover)) {
      return this.translate3D(this.translateX * 2)
    }
  
    return this.translate3D(this.translateX)
  }
}

export default SliderTranslateCalculator
