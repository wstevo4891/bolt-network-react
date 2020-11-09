import React from 'react'
import PropTypes from 'prop-types'

const DisplayRow = ({ label, value }) => (
  <p><span>{label}: </span>{value}</p>
)

DisplayRow.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired, 
}

export default DisplayRow
