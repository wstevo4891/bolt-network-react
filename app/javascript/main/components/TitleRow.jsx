import React from 'react'
import PropTypes from 'prop-types'

const TitleRow = ({ title }) => (
  <div className="row">
    <div className="col-12 mb-4">
      <h1 style={{ color: 'white' }}>{title}</h1>
    </div>
  </div>
)

TitleRow.propTypes = {
  title: PropTypes.string,
}

export default TitleRow
