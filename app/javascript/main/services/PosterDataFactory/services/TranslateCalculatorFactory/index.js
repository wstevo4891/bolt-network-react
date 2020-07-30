// Translate Calculator Factory Function

import SliderTranslateCalculator from './SliderTranslateCalculator'

import StaticTranslateCalculator from './StaticTranslateCalculator'

import TranslateCalculator from './TranslateCalculator'

import { SLIDER, STATIC } from '@utils'

const POSTER_WIDTH_MULTIPLIER = 0.38

function calcTranslateX() {
  const posters = document.getElementsByClassName('poster-container')

  if (posters.length === 0) return 0

  const width = posters[0].clientWidth

  return Math.round(width * POSTER_WIDTH_MULTIPLIER)
}

function sliderParams(params, translateX) {
  const { limit, slideLength, start } = params
  let end, hoverItem

  if (start) {
    end = slideLength - 1
    hoverItem = params.hoverItem
  } else {
    end = limit - 1
    hoverItem = params.hoverItem + slideLength
  }

  return Object.assign({}, { end, hoverItem, limit, slideLength, start, translateX })
}

function SliderTranslateCalculatorPlus(params, translateX) {
  const newParams = sliderParams(params, translateX)

  return Object.assign({},
    TranslateCalculator,
    newParams,
    {
      negativeTranslate() {
        if (
          this.start === false &&
          this.hoverItem === this.slideLength + 1
        ) return null
    
        if (this.hoverItem === this.end) {
          return this.translate3D(-this.translateX * 2)
        } else {
          return this.translate3D(-this.translateX)
        }
      },

      bookEndPosition(index) {
        return (this.start && index === 0) || index === this.slideLength + 1
      },

      currentPositionTranslate(index) {
        const translate = this.calcCurrentTranslate(index)
    
        return this.translate3D(translate, true)
      },

      afterHoverTranslate() {
        if (this.hoverItem === this.end) return null
    
        if (this.bookEndPosition(this.hoverItem)) {
          return this.translate3D(this.translateX * 2)
        }
      
        return this.translate3D(this.translateX)
      },
    }
  )
}

export default function TranslateCalculatorFactory(params) {
  const translateX = calcTranslateX()

  switch(params.type) {
    case STATIC:
      return Object.assign({}, TranslateCalculator, params, { translateX })

    case SLIDER:
      return SliderTranslateCalculatorPlus(params, translateX)

    default:
      return null
  }
}

/**
 * Factory function that returns the correct
 * type of TranslateCalculator class
 * 
 * @param {Object} params
 * 
 * @returns {Object}
 */
// export default function TranslateCalculatorFactory(params) {
//   switch(params.type) {
//     case SLIDER:
//       return new SliderTranslateCalculator(params)

//     case STATIC:
//       return new StaticTranslateCalculator(params)

//     default:
//       return null
//   }
// }
