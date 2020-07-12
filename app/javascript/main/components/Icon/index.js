import React from 'react'
import PropTypes from 'prop-types'

const Icon = (props) => (
  <i
    className={`fa ${props.icon}`}
    id={props.id}
    aria-hidden={props.ariaHidden}
  />
)

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  id: PropTypes.string,
  ariaHidden: PropTypes.string,
}

Icon.defaultProps = {
  id: null,
  ariaHidden: null,
}

export default Icon
