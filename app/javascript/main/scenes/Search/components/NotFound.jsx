// app/javascript/main/scenes/Search/components/NotFound.jsx

import React from 'react'
import queryString from 'query-string'

import PosterRow from '../../components/PosterRow'
import StaticSlides from '../../services/StaticSlides'

const NotFound = (props) => {
  const query = decodeURIComponent(queryString.parse(props.search).q)

  return(
    <div className="row justify-content-center">
      <div className="col-6 col-sm-4 not-found">
        <p>Your search for "{query}" did not have any matches.</p>

        <p>Suggestions:</p>
        <ul>
          <li>Try different keywords</li>
          <li>Try using a movie title</li>
          <li>Try a genre, like comedy, romance, action, or drama</li>
        </ul>
      </div>
    </div>
  )
}

export default NotFound
