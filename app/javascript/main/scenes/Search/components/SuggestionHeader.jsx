import React from 'react'
import PropTypes from 'prop-types'

function headerText(type, suggestion) {
  if (type === 'genre') {
    return `Titles in: ${suggestion}`

  } else if (type === 'person') {
    return `Results for ${suggestion} and more fan favorites`

  } else if (type === 'movie') {
    return `Titles related to ${suggestion}`
  }
}

const SuggestionHeader = ({ suggestionId, suggestion }) => {
  if (suggestionId === undefined) return null

  const type = suggestionId.split('_')[1]
  const header = headerText(type, suggestion)

  return(
    <div className="col-12">
      <div className="suggestionHeader">
        <div className="title">
          {header}
        </div>
      </div>
    </div>
  )
}

SuggestionHeader.propTypes = {
  suggestion: PropTypes.string,
  suggestionId: PropTypes.string,
}

SuggestionHeader.defaultProps = {
  suggestion: null,
  suggestionId: undefined,
}

export default SuggestionHeader
