import React from 'react'

// Components
import NotFound from './NotFound'
import MobileView from './MobileView'
import DesktopView from './DesktopView'

const SearchResults = (props) => {
  const { genres, movies, people, query, slideLength } = props

  if (genres.length === 0 && movies.length === 0) {
    return <NotFound query={query} />

  } else if (window.innerWidth < 768) {
    return(
      <MobileView
        query={query}
        genres={genres}
        movies={movies}
        people={people}
        slideLength={slideLength}
      />
    )

  } else {
    return(
      <DesktopView
        query={query}
        genres={genres}
        movies={movies}
        people={people}
        slideLength={slideLength}
      />
    )
  }
}

export default SearchResults
