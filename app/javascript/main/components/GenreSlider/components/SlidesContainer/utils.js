// Service for building translate3d container style for slides container

const TRANSFORMATIONS = {
  2: -150,
  3: -133.33333333333334,
  4: -125,
  5: -120,
  6: -116.66666666666667
}

function translate3D(x = 0) {
  return { transform: `translate3d(${x}%, 0px, 0px)` }
}

function transformStyle(params) {
  const translateX = TRANSFORMATIONS[params.slideLength]

  if (params.next) {
    return translate3D(translateX - 100)

  } else if (params.prev) {
    return translate3D(translateX + 100)

  } else return translate3D(translateX)
}

export default function translateFactory(params) {
  if (params.start) {
    if (params.next) return translate3D(-100)

    return translate3D()
  }

  return transformStyle(params)
}
