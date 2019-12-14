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

  call = (index) => {
    this.index = index

    return this.calculate()
  }

  calculate = () => {
    if (this.index < this.hover) {
      if (
        this.start === false &&
        this.hover === this.slideLength + 1
      ) return null
  
      return this.negativeTranslate()
  
    } else if (this.index === this.hover) {
      return this.currentPositionTranslate()
  
    } else if (this.index > this.hover) {
      if (this.hover === this.end - 1) return null
  
      return this.afterHoverTranslate()
    }
  }

  negativeTranslate = () => {
    if (this.hover === this.end - 1) {
      return this.translate3D(-this.translateX * 2)
    } else {
      return this.translate3D(-this.translateX)
    }
  }
  
  currentPositionTranslate = () => {
    const translate = this.calcCurrentTranslate()

    return this.translate3D(translate, true)
  }

  calcCurrentTranslate = () => {
    if (
      (this.start && this.index === 0) ||
      this.index === this.slideLength + 1
    ) {
      return Math.floor((this.translateX / 2) + 5)
  
    } else if (this.index === this.end - 1) {

      return -Math.floor((this.translateX / 2) + 8)
  
    } else return 0
  }
  
  afterHoverTranslate = () => {
    if (
      (this.start && this.hover === 0) ||
      this.hover === this.slideLength + 1
    ) return this.translate3D(this.translateX * 2)
  
    return this.translate3D(this.translateX)
  }
}

export default SliderTranslateCalculator
