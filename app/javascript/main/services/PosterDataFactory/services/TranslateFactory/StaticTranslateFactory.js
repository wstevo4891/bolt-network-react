// Static Poster Translate Calculator

export default function StaticTranslateFactory(index, params) {
  const { hoverItem } = params

  if (index < hoverItem) {  
    return negativeTranslate(params)

  } else if (index === hoverItem) {
    return currentPositionTranslate(index, params)

  } else if (index > hoverItem) {  
    return afterHoverTranslate(index, params)
  }
}

function negativeTranslate(params) {
  const { end, hoverItem, translateX } = params

  if (hoverItem === end) {
    return translate3D(-translateX * 2)
  } else {
    return translate3D(-translateX)
  }
}

function currentPositionTranslate(index) {
  const translate = currentTranslateX(index)

  return translate3D(translate, true)
}

function currentTranslateX(index, params) {
  const { end, translateX } = params

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

function translate3D(x, scale = false) {
  const translate = `translate3d(${x}px, 0px, 0px)`

  if (scale) return `scale(1.75) ${translate}`

  return translate
}
