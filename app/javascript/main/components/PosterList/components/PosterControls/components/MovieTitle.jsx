import React from 'react'
import PropTypes from 'prop-types'

const MovieTitle = ({ title }) => {
  if (title.length > 40) {
    return <h3>{title.substring(0, 40) + '...'}</h3>
  } else {
    return <h3>{title}</h3>
  }
}

MovieTitle.propTypes = {
  title: PropTypes.string.isRequired
}

export default MovieTitle
