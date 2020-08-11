// Poster Params Factory

const staticParams = (params) => ({
  end: params.slideLength - 1,
  hoverItem: params.hoverItem,
  slideLength: params.slideLength,
  type: params.type,
})

const sliderParams = (params) => ({
  end: params.slideLength - 1,
  hoverItem: params.hoverItem,
  limit: (params.slideLength * 2) + 1,
  slideLength: params.slideLength,
  start: params.start,
  type: params.type,
})

/**
 * Factory Function to return the
 * correct type of Style Params
 * 
 * @param {String} type 
 * @param {Object} props
 * 
 * @returns {Object}
 */
export default function PosterParamsFactory(props) {
  switch(props.type) {
    case 'static':
      return staticParams(props)

    case 'slider':
      return sliderParams(props)

    default:
      return null
  }
}
