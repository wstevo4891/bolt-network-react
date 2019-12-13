import React from 'react'

const headerText = (type, suggestion) => {
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

  return(
    <div className="suggestionHeader">
      <div className="title">
        {headerText(type, suggestion)}
      </div>
    </div>
  )
}

export default SuggestionHeader
