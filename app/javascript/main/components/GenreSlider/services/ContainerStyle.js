// Service for building translate3d container style
// for slides container

const TRANSFORMATIONS = {
  2: -150,
  3: -133.33333333333334,
  4: -125,
  5: -120,
  6: -116.66666666666667
}

export default class ContainerStyle {
  constructor(props) {
    this.slideLength = props.slideLength
    this.start = props.start
    this.next = props.next
    this.prev = props.prev
  }

  call() {
    if (this.start) {
      return this.startStyle()
    } else {
      return this.transformStyle()
    }
  }

  startStyle() {
    if (this.next) {
      return this.translate3D(-100)
    } else {
      return this.translate3D(0)
    }
  }

  transformStyle() {
    const translateX = TRANSFORMATIONS[this.slideLength]

    if (this.next) {
      return this.translate3D(translateX - 100)

    } else if (this.prev) {
      return this.translate3D(translateX + 100)

    } else {
      return this.translate3D(translateX)
    }
  }

  translate3D(x) {
    return { transform: `translate3d(${x}%, 0px, 0px)` }
  }
}
