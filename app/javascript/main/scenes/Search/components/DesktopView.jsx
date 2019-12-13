// app/javascript/main/scenes/Search/components/ResultsDisplay.jsx

import React from 'react'

// Components
import SuggestionsList from './SuggestionsList'
import SuggestionHeader from './SuggestionHeader'
import Results from '../../../components/Results'

const DesktopView = (props) => (
  <div className="search-results">
    <div className="display-container">
      <div className="row">
        <div className="col-12">
          <SuggestionsList
            query={props.params.query}
            genres={props.genres}
            movies={props.movies}
            people={props.people}
            handleClick={props.handleClick}
          />
        </div>

        <div className="col-12">
          <SuggestionHeader
            suggestionId={props.params.suggestionId}
            suggestion={props.suggestion}
          />
        </div>
      </div>

      <Results movies={props.movies} slideLength={props.slideLength} />
    </div>
  </div>
)

export default DesktopView
