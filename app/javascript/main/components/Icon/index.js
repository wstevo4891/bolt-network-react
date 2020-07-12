import React from 'react'
import PropTypes from 'prop-types'

const Icon = (props) => (
  <i
    aria-hidden={props.ariaHidden}
    className={`fa ${props.icon}`}
    id={props.id}
    onClick={props.handleClick}
  />
)

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  ariaHidden: PropTypes.string,
  handleClick: PropTypes.func,
  id: PropTypes.string,
}

Icon.defaultProps = {
  ariaHidden: null,
  handleClick: () => void {},
  id: null,
}

export default Icon
