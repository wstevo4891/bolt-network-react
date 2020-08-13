// Static Poster Translate Calculator

import { negativeTranslate, translate3D } from './helpers'

export default function StaticTranslateFactory(params) {
  const { index, hoverItem } = params

  if (index < hoverItem) {  
    return negativeTranslate(params)

  } else if (index === hoverItem) {
    return currentPositionTranslate(params)

  } else if (index > hoverItem) {  
    return afterHoverTranslate(params)
  }
}

function currentPositionTranslate(params) {
  const translate = currentTranslateX(params)

  return translate3D(translate, true)
}

function currentTranslateX(params) {
  const { end, index, translateX } = params

  if (index === 0) {
    return Math.floor((translateX / 2) + 5)

  } else if (index === end) {
    return -Math.floor((translateX / 2) + 8)

  } else return 0
}
  
function afterHoverTranslate(params) {
  const { end, hoverItem, translateX } = params

  if (hoverItem === 0 || hoverItem === end) {
    return translate3D(translateX * 2)

  } else {
    return translate3D(translateX)
  }
}
