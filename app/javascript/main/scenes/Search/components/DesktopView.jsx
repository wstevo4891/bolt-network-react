// app/javascript/main/scenes/Search/components/ResultsDisplay.jsx

import React from 'react'

// Components
import SuggestionsList from './SuggestionsList'
import Results from '../../../components/Results'

const DesktopView = (props) => (
  <div className="search-results">
    <div className="display-container">
      <div className="row">
        <div className="col-12">
          <div className="suggestions">
            <span className="suggestionsLabel">
              Explore titles related to:&nbsp;
            </span>

            <SuggestionsList genres={props.genres} movies={props.movies} />
          </div>
        </div>
      </div>

      <Results movies={props.movies} slideLength={props.slideLength} />
    </div>
  </div>
)

export default DesktopView
