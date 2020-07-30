const TranslateCalculator = {
  end: null,
  hoverItem: null,
  slideLength: null,
  translateX: null,

  call(index) {
    if (index < this.hoverItem) {  
      return this.negativeTranslate()
  
    } else if (index === this.hoverItem) {
      return this.currentPositionTranslate(index)
  
    } else if (index > this.hoverItem) {  
      return this.afterHoverTranslate()
    }
  },

  negativeTranslate() {
    if (this.hoverItem === this.end) {
      return this.translate3D(-this.translateX * 2)
    } else {
      return this.translate3D(-this.translateX)
    }
  },

  currentPositionTranslate(index) {
    const translate = this.calcCurrentTranslate(index)

    return this.translate3D(translate, true)
  },

  calcCurrentTranslate(index) {
    if (this.bookEndPosition(index)) {
      return Math.floor((this.translateX / 2) + 5)
  
    } else if (index === this.end) {
      return -Math.floor((this.translateX / 2) + 8)
  
    } else return 0
  },

  bookEndPosition(index) {
    return index === 0
  },
  
  afterHoverTranslate() {
    if (this.hoverItem === 0 || this.hoverItem === this.end) {
      return this.translate3D(this.translateX * 2)
  
    } else {
      return this.translate3D(this.translateX)
    }
  },

  translate3D(x, scale = false) {
    const translate = `translate3d(${x}px, 0px, 0px)`

    if (scale) return `scale(1.75) ${translate}`

    return translate
  },
}

export default TranslateCalculator
