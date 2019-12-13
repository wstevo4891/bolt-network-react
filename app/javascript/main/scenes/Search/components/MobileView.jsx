// MovileDisplay.jsx

import React from 'react'

// Components
import SuggestionsList from './SuggestionsList'
import Results from '../../../components/Results'

const MobileView = (props) => (
  <div className="search-results">
    <div className="display-container">
      <div className="row">
        <div className="col-12 mb-2">
          <span className="suggestionsLabel">
            Results for "{props.params.query}"
          </span>
        </div>
      </div>

      <Results movies={props.movies} slideLength={props.slideLength} />

      <div className="row">
        <div className="col-12">
          <SuggestionsList
            query={props.params.query}
            genres={props.genres}
            movies={props.movies}
            people={props.people}
          />
        </div>
      </div>
    </div>
  </div>
)

export default MobileView
