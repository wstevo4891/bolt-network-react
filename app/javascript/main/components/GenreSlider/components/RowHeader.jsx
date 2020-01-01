import React from 'react'
import PropTypes from 'prop-types'

const RowHeader = ({ genre }) => (
  <h2 className='rowHeader'>
    <a className='rowTitle' href={`/genres/${genre.toLowerCase()}`}>
      <div className='row-header-title'>{genre}</div>
    </a>
  </h2>
)

RowHeader.propTypes = {
  genre: PropTypes.string
}

export default RowHeader
