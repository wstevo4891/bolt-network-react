import React from 'react'

// Components
import { DisplayContainer, Results } from '@components'

import Suggestions from './Suggestions'

const MobileView = ({ resultsProps, suggestionsProps }) => (
  <div className="search-results">
    <DisplayContainer>
      <div className="row">
        <div className="col-12 mb-2">
          <span className="suggestionsLabel">
            Results for &quot;{suggestionsProps.data.query}&quot;
          </span>
        </div>
      </div>

      <Results {...resultsProps} />

      <div className="row">
        <Suggestions {...suggestionsProps} />
      </div>
    </DisplayContainer>
  </div>
)

export default MobileView
