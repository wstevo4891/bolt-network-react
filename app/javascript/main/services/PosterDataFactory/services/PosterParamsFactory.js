// Poster Params Factory

const PosterParams = ({ type, slideLength, hoverItem }) => ({
  type,
  slideLength,
  hoverItem,
})

const StaticParams = (params) => {
  return Object.assign(PosterParams(params), {
    end: params.slideLength - 1,
  })
}

const SliderParams = (params) => {
  return Object.assign(PosterParams(params), {
    start: params.start,
    end: params.slideLength - 1,
    limit: (params.slideLength * 2) + 1,
  })
}

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
      return StaticParams(props)

    case 'slider':
      return SliderParams(props)

    default:
      return null
  }
}
