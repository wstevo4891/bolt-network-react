import React from 'react'

// Components
import {
  DisplayContainer,
  Results
} from '@components'

import Suggestions from './Suggestions'
import SuggestionHeader from './SuggestionHeader'

const DesktopView = ({ headerProps, resultsProps, suggestionsProps }) => (
  <div className="search-results">
    <DisplayContainer>
      <div className="row">
        <Suggestions {...suggestionsProps} />

        <SuggestionHeader {...headerProps} />
      </div>

      <Results {...resultsProps} />
    </DisplayContainer>
  </div>
)

export default DesktopView
