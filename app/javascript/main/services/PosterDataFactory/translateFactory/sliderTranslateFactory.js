// Slider Poster Translate Calculator

import { negativeTranslate, translate3D } from './helpers'

export default function sliderTranslateFactory(params) {
  const factoryParams = sliderParams(params)

  const { index, hoverItem } = factoryParams

  if (index < hoverItem) {  
    return beforeHoverTranslate(factoryParams)

  } else if (index === hoverItem) {
    return currentPositionTranslate(factoryParams)

  } else if (index > hoverItem) {  
    return afterHoverTranslate(factoryParams)
  }
}

function sliderParams(params) {
  if (params.start) return params

  return {
    ...params,
    end: params.limit - 1,
    hoverItem: params.hoverItem + params.slideLength,
  }
}

function beforeHoverTranslate(params) {
  if (
    params.start === false &&
    params.hoverItem === params.slideLength + 1
  ) return null

  return negativeTranslate(params)
}

function currentPositionTranslate(params) {
  const translate = currentTranslateX(params)

  return translate3D(translate, true)
}

function currentTranslateX(params) {
  if (bookEndPosition(params.index, params)) {
    return Math.floor((params.translateX / 2) + 5)

  } else if (params.index === params.end) {
    return -Math.floor((params.translateX / 2) + 8)

  } else return 0
}

function bookEndPosition(position, params) {
  return (params.start && position === 0) || position === params.slideLength + 1
}

function afterHoverTranslate(params) {
  if (params.hoverItem === params.end) return null

  if (bookEndPosition(params.hoverItem, params)) {
    return translate3D(params.translateX * 2)
  }

  return translate3D(params.translateX)
}
