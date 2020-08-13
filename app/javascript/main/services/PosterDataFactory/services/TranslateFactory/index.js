import { SLIDER, STATIC } from '@utils'

import StaticTranslateFactory from './StaticTranslateFactory'
import SliderTranslateFactory from './SliderTranslateFactory'

const POSTER_WIDTH_MULTIPLIER = 0.38

function calcTranslateX() {
  const posters = document.getElementsByClassName('poster-container')

  if (posters.length === 0) return 0

  return Math.round(posters[0].clientWidth * POSTER_WIDTH_MULTIPLIER)
}

export default function TranslateFactory(index, params) {
  params.index = index
  params.translateX = calcTranslateX()

  switch(params.type) {
    case STATIC:
      return StaticTranslateFactory(params)

    case SLIDER:
      return SliderTranslateFactory(params)

    default:
      return null
  }
}
