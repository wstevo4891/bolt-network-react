import React from 'react'
import PropTypes from 'prop-types'

const DisplayContainer = ({ children }) => {
  return (
    <div className="display-container">
      {children}
    </div>
  )
}

DisplayContainer.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
}

export default DisplayContainer
