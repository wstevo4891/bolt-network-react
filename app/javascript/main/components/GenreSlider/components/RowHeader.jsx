import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

const RowHeader = ({ genre }) => {
  const genreUrl = `/genres/${genre.toLowerCase()}`

  return (
    <h2 className='rowHeader'>
      <Link to={genreUrl} className='rowTitle'>
        <div className='row-header-title'>{genre}</div>
      </Link>
    </h2>
  )
}

RowHeader.propTypes = {
  genre: PropTypes.string
}

export default RowHeader
