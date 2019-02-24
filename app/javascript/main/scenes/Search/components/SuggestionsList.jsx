// app/javascript/main/scenes/Search/components/SuggestionsList.jsx

import React from 'react'
import { Link } from 'react-router-dom'

import Suggestions from '../services/Suggestions'

const SuggestionsList = (props) => {
  const { genres, movies } = props

  const suggestions = new Suggestions(genres, movies).call()

  return(
    <ul>
      {suggestions.map((suggestion, index) =>
        <li key={index}>
          <Link to={suggestion.link}>{suggestion.name}</Link>
        </li>
      )}
    </ul>
  )
}

export default SuggestionsList
