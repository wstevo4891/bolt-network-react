import { SLIDER, STATIC } from '@utils'

import staticTranslateFactory from './staticTranslateFactory'
import sliderTranslateFactory from './sliderTranslateFactory'

const POSTER_WIDTH_MULTIPLIER = 0.38

function calcTranslateX() {
  const posters = document.getElementsByClassName('poster-container')

  if (posters.length === 0) return 0

  return Math.round(posters[0].clientWidth * POSTER_WIDTH_MULTIPLIER)
}

export default function translateFactory(index, params) {
  params.index = index
  params.translateX = calcTranslateX()

  switch(params.type) {
    case STATIC:
      return staticTranslateFactory(params)

    case SLIDER:
      return sliderTranslateFactory(params)

    default:
      return null
  }
}
