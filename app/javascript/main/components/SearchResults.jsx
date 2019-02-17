// app/javascript/main/components/SearchResults

import React from 'react'

const SearchResults = (props) => {
  const movies = props.movies

  return(
    <div className="search-results">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="suggestions"></div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchResults
