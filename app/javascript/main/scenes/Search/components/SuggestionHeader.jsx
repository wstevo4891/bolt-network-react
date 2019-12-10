import React from 'react'

const SuggestionHeader = (props) => {
  if (props.suggestionId === undefined) return null

  const type = props.suggestionId.split('_')[1]
  
  const evalHeader = () => {
    if (type === 'genre') {
      return `Titles in: ${props.suggestion}`

    } else if (type === 'person') {
      return `Results for ${props.suggestion} and more fan favorites`

    } else if (type === 'movie') {
      return `Titles related to ${props.suggestion}`
    }
  }

  return(
    <div className="col-12">
      <div className="suggestionHeader">
        <div className="title">{evalHeader()}</div>
      </div>
    </div>
  )
}

export default SuggestionHeader
