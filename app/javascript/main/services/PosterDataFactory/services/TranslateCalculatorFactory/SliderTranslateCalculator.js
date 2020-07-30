// Slider Translate Calculator

import StaticTranslateCalculator from './StaticTranslateCalculator'

class SliderTranslateCalculator extends StaticTranslateCalculator {
  constructor(params) {
    super(params)
    this.start = params.start
    this.limit = params.limit
    this.end = this.start ? this.slideLength - 1 : this.limit - 1
    this.hoverItem = this.start ? this.hoverItem : this.hoverItem + this.slideLength
  }

  negativeTranslate() {
    if (
      this.start === false &&
      this.hoverItem === this.slideLength + 1
    ) return null

    return super.negativeTranslate()
  }

  calcCurrentTranslate(index) {
    if (this.bookEndPosition(index)) {
      return Math.floor((this.translateX / 2) + 5)
  
    } else if (index === this.end) {
      return -Math.floor((this.translateX / 2) + 8)
  
    } else return 0
  }

  /**
   * Check if current poster is at the start or
   * end of its list.
   * @function bookEndPosition
   * 
   * @param {Number} position
   * 
   * @returns Boolean
   */
  bookEndPosition(position) {
    return (this.start && position === 0) || position === this.slideLength + 1
  }

  afterHoverTranslate() {
    if (this.hoverItem === this.end) return null

    if (this.bookEndPosition(this.hoverItem)) {
      return this.translate3D(this.translateX * 2)
    }
  
    return this.translate3D(this.translateX)
  }
}

export default SliderTranslateCalculator
