import React from 'react'

// Components
import NotFound from './NotFound'
import MobileView from './MobileView'
import DesktopView from './DesktopView'

const SearchResults = (props) => {
  const { genres, movies, params } = props

  if (genres.length === 0 && movies.length === 0) {
    return <NotFound query={params.query} />

  } else if (window.innerWidth < 768) {
    return <MobileView {...props} />

  } else {
    return <DesktopView {...props} />
  }
}

export default SearchResults
