// PosterStyle Factory

import TranslateCalculatorFactory from './TranslateCalculatorFactory'

const hoverStyle = (translate = null) => ({
  transform: translate || 'translate3d(0px, 0px, 0px)',
  transitionDuration: '400ms',
  transitionTimingFunction: 'cubic-bezier(0.5, 0, 0.1, 1)',
  transitionDelay: '0ms',
})

const HoverStyleFactory = (index, params) => {
  if (params.hoverItem === null) return hoverStyle()

  const translate = TranslateCalculatorFactory(params).call(index)

  return hoverStyle(translate)
}

export default HoverStyleFactory
