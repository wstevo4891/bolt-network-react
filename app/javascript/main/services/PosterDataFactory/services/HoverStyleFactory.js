// PosterStyle Factory

import TranslateCalculatorFactory from './TranslateCalculatorFactory'

function HoverStyle(translateValue) {
  this.transform = translateValue || 'translate3d(0px, 0px, 0px)'
  this.transitionDuration = '400ms'
  this.transitionTimingFunction = 'cubic-bezier(0.5, 0, 0.1, 1)'
  this.transitionDelay = '0ms'
}

export default class HoverStyleFactory {
  constructor(params) {
    this.hoverItem = params.hoverItem
    this.calculator = TranslateCalculatorFactory.build(params)
  }

  build(index) {
    if (this.hoverItem === null) return new HoverStyle()

    const translateValue = this.calculator.call(index)

    return new HoverStyle(translateValue)
  }
}
