// Static Poster Translate Calculator

import TranslateCalculator from './TranslateCalculator'

class StaticTranslateCalculator extends TranslateCalculator {
  constructor(params) {
    super(params)
    this.end = params.end
  }

  call = (index) => {
    this.index = index

    return this.calculate()
  }

  calculate = () => {
    if (this.index < this.hoverItem) {  
      return this.negativeTranslate()
  
    } else if (this.index === this.hoverItem) {
      return this.currentPositionTranslate()
  
    } else if (this.index > this.hoverItem) {  
      return this.afterHoverTranslate()
    }
  }

  negativeTranslate = () => {
    if (this.hoverItem === this.end) {
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
    if (this.index === 0) {
      return Math.floor((this.translateX / 2) + 5)
  
    } else if (this.index === this.end) {
      return -Math.floor((this.translateX / 2) + 8)
  
    } else return 0
  }
  
  afterHoverTranslate = () => {
    if (this.hoverItem === 0 || this.hoverItem === this.end) {
      return this.translate3D(this.translateX * 2)
  
    } else {
      return this.translate3D(this.translateX)
    }
  }
}

export default StaticTranslateCalculator
