import { SLIDER, STATIC } from '@utils'

const POSTER_WIDTH_MULTIPLIER = 0.38

function calcTranslateX() {
  const posters = document.getElementsByClassName('poster-container')

  if (posters.length === 0) return 0

  const width = posters[0].clientWidth

  return Math.round(width * POSTER_WIDTH_MULTIPLIER)
}

export default function TranslateFactory(index, params) {
  params.translateX = calcTranslateX()

  switch(params.type) {
    case STATIC:
      return StaticTranslateFactory(index, params)

    case SLIDER:
      return SliderTranslateFactory(index, params)

    default:
      return null
  }
}
