// PosterStyle Factory

import TranslateCalculatorFactory from './TranslateCalculatorFactory'

const HoverStyle = (translate = 'translate3d(0px, 0px, 0px)') => ({
  transform: translate,
  transitionDuration: '400ms',
  transitionTimingFunction: 'cubic-bezier(0.5, 0, 0.1, 1)',
  transitionDelay: '0ms',
})

const HoverStyleFactory = (params) => ({
  hoverItem: params.hoverItem,

  calculator: TranslateCalculatorFactory(params),

  build(index) {
    if (this.hoverItem === null) return HoverStyle()

    const translateValue = this.calculator.call(index)

    return HoverStyle(translateValue)
  }
})

export default HoverStyleFactory
