import React from 'react'
import PropTypes from 'prop-types'

import { DisplayContainer } from '@components'

const NotFound = ({ query }) => (
  <div className="search-results">
    <DisplayContainer>
      <div className="row justify-content-center">
        <div className="not-found">
          <p className="not-found-query">
            Your search for &quot;{query}&quot; did not have any matches.
          </p>

          <p>Suggestions:</p>
          <ul>
            <li>Try different keywords</li>
            <li>Try using a movie title</li>
            <li>Try a genre, like comedy, romance, action, or drama</li>
          </ul>
        </div>
      </div>
    </DisplayContainer>
  </div>
)

NotFound.propTypes = {
  query: PropTypes.string,
}

export default NotFound
