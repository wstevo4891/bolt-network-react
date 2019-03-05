// app/javascript/main/scenes/Search/components/MobileResults.jsx

import React from 'react'

// Components
import SuggestionsList from './SuggestionsList'
import Results from '../../components/Results'

const MobileResults = (props) => (
  <div className="search-results">
    <div className="display-container">
      <div className="row">
        <div className="col-12 mb-2">
          <span className="suggestionsLabel">
            Results for "{props.query}"
          </span>
        </div>
      </div>

      <Results movies={props.movies} slideLength={props.slideLength} />

      <div className="row">
        <div className="col-12">
          <div className="suggestions">
            <span className="suggestionsLabel">Explore titles related to</span>

            <SuggestionsList genres={props.genres} movies={props.movies} />
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default MobileResults
