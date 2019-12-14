// Translate Calculator Service

export default class TranslateCalculator {
  constructor(params) {
    this.hoverItem = params.hoverItem
    this.slideLength = params.slideLength
    this.translateX = this.calcTranslateX()
  }

  calcTranslateX = () => {
    const posters = document.getElementsByClassName('poster-container')

    if (posters.length === 0) return 0

    const width = posters[0].clientWidth

    return Math.round(width * 0.38)
  }

  translate3D = (x, scale = false) => {
    if (scale) {
      return `scale(1.75) translate3d(${x}px, 0px, 0px)`
    } else {
      return `translate3d(${x}px, 0px, 0px)`
    }
  }
}
