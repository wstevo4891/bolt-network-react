// app/javascript/main/scenes/Search/components/NotFound.jsx

import React from 'react'

const NotFound = (props) => (
  <div className="row justify-content-center">
    <div className="col-6 col-sm-4 not-found">
      <p className="not-found-query">
        Your search for "{props.query}" did not have any matches.
      </p>

      <p>Suggestions:</p>
      <ul>
        <li>Try different keywords</li>
        <li>Try using a movie title</li>
        <li>Try a genre, like comedy, romance, action, or drama</li>
      </ul>
    </div>
  </div>
)

export default NotFound
