// Translate Calculator Factory Function

import SliderTranslateCalculator from './services/SliderTranslateCalculator'

import StaticTranslateCalculator from './services/StaticTranslateCalculator'

import { SLIDER, STATIC } from '@utils'

export default class TranslateCalculatorFactory {
  /**
   * Static factory function that returns the correct
   * type of TranslateCalculator class
   * 
   * @param {Object} params
   * 
   * @returns {Object}
   */
  static build(params) {
    switch(params.type) {
      case SLIDER:
        return new SliderTranslateCalculator(params)

      case STATIC:
        return new StaticTranslateCalculator(params)

      default:
        return null
    }
  }
}
