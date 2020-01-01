// Slider Position Calculator

/**
 * @description Service for calculating current position in GenreSlider
 * 
 * @param {Number} listLength
 */
class PositionCalculator {
  constructor(listLength) {
    this.listLength = listLength
  }

  calcPosition(next, prev, position) {
    if (next) {
      return this.nextPosition(position)
    } else if (prev) {
      return this.prevPosition(position)
    }
  }

  nextPosition(position) {
    if (position === this.listLength) {
      return 1
    } else {
      return position + 1
    }
  }

  prevPosition(position) {
    if (position === 1) {
      return this.listLength
    } else {
      return position - 1
    }
  }
}

export default PositionCalculator
