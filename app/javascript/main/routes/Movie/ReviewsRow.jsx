import React from 'react'
import PropTypes from 'prop-types'

const ROW_STYLE = {
  margin: '1rem 0',
}

const BLUE = {
  color: '#0393FF'
}

const ReviewsRow = ({ reviews }) => (
  <div style={ROW_STYLE}>
    <span style={BLUE}>Reviews:</span>

    <ul style={{ color: 'white' }}>
      {reviews.map(({ source, value }, index) => (
        <li key={index} style={{ marginBottom: '1rem' }}>
          <span style={BLUE}>{source}:</span> {value}
        </li>
      ))}
    </ul>
  </div>
)

ReviewsRow.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      source: PropTypes.string,
      value: PropTypes.string,
    })
  ).isRequired,
}

export default ReviewsRow
