// Poster Style Service

class PosterParams {
  constructor(props) {
    this.type = props.type
    this.slideLength = props.slideLength
    this.hoverItem = props.hoverItem
  }
}

class StaticParams extends PosterParams {
  constructor(props) {
    super(props)
    this.end = props.slideLength - 1
  }
}

class SliderParams extends PosterParams {
  constructor(props) {
    super(props)
    this.start = props.start
    this.limit = (props.slideLength * 2) + 1
  }
}

export default class PosterParamsFactory {
  /**
   * Static Factory Method to return the
   * correct type of Style Params
   * 
   * @param {String} type 
   * @param {Object} props
   * 
   * @returns {Object}
   */
  static build(props) {
    switch(props.type) {
      case 'static':
        return new StaticParams(props)

      case 'slider':
        return new SliderParams(props)

      default:
        return null
    }
  }
}
