export function negativeTranslate(params) {
  const { end, hoverItem, translateX } = params

  if (hoverItem === end) {
    return translate3D(-translateX * 2)
  } else {
    return translate3D(-translateX)
  }
}

export function translate3D(x, scale = false) {
  const translate = `translate3d(${x}px, 0px, 0px)`

  if (scale) return `scale(1.75) ${translate}`

  return translate
}
