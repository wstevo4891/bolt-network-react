// app/javascript/main/scenes/Search/components/SuggestionsList.jsx

import React from 'react'
import { Link } from 'react-router-dom'

import Suggestions from '../services/Suggestions'

const SuggestionsList = (props) => {

  const suggestions = new Suggestions(props).call()

  return(
    <div className="suggestions">
      <span className="suggestionsLabel">
        Explore titles related to:&nbsp;
      </span>

      <ul>
        {suggestions.map((suggestion, index) =>
          <li
            key={index}
            onClick={(event) => props.handleClick(event)}
          >
            <Link to={suggestion.link}>
              {suggestion.name}
            </Link>
          </li>
        )}
      </ul>
    </div>
  )
}

export default SuggestionsList
