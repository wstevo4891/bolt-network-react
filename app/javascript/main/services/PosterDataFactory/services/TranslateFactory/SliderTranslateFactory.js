// Slider Poster Translate Calculator

export default function SliderTranslateFactory(index, params) {
  const factoryParams = sliderParams(params)

  if (index < factoryParams.hoverItem) {  
    return beforeHoverTranslate(factoryParams)

  } else if (index === factoryParams.hoverItem) {
    return currentPositionTranslate(index, factoryParams)

  } else if (index > factoryParams.hoverItem) {  
    return afterHoverTranslate(index, factoryParams)
  }
}

function sliderParams(params) {
  if (params.start) return params

  params.end = params.limit - 1
  params.hoverItem = params.hoverItem + params.slideLength

  return params
}

function beforeHoverTranslate(params) {
  if (
    params.start === false &&
    params.hoverItem === this.slideLength + 1
  ) return null

  return negativeTranslate(params)
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
