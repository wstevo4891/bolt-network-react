// Translate Calculator Factory Function

import SliderTranslateCalculator from './services/SliderTranslateCalculator'

import StaticTranslateCalculator from './services/StaticTranslateCalculator'

export default class TranslateCalculator {
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
      case 'slider':
        return new SliderTranslateCalculator(params)

      case 'static':
        return new StaticTranslateCalculator(params)

      default:
        return null
    }
  }
}
