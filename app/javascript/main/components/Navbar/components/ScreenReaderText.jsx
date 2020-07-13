import React from 'react'
import PropTypes from 'prop-types'

const ScreenReaderText = (props) => {
  if (props.path === props.href) {
    return <span className="sr-only">{"(current)"}</span>
  }

  return <span className="sr-only">{props.text}</span>
}

ScreenReaderText.propTypes = {
  href: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

export default ScreenReaderText
