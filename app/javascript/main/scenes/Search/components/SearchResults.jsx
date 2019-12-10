import React from 'react'

// Components
import NotFound from './NotFound'
import MobileView from './MobileView'
import DesktopView from './DesktopView'

const SearchResults = (props) => {
  const { genres, movies, people, params, slideLength } = props

  if (genres.length === 0 && movies.length === 0) {
    return <NotFound query={params.query} />

  } else if (window.innerWidth < 768) {
    return(
      <MobileView
        genres={genres}
        movies={movies}
        people={people}
        params={params}
        suggestion={props.suggestion}
        slideLength={slideLength}
        handleClick={props.handleClick}
      />
    )

  } else {
    return(
      <DesktopView
        genres={genres}
        movies={movies}
        people={people}
        params={params}
        suggestion={props.suggestion}
        slideLength={slideLength}
        handleClick={props.handleClick}
      />
    )
  }
}

export default SearchResults
