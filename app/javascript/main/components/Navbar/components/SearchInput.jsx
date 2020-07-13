import React from 'react'
import PropTypes from 'prop-types'

const SearchInput = (props) => (
  <input
    type="text"
    name="query"
    id="search"
    className="form-control"
    maxLength="80"
    placeholder={props.placeholder}
    aria-label={props.placeholder}
    onKeyUp={props.handleKeyUp}
    onClick={props.handleClick}
  />
)

SearchInput.propTypes = {
  handleClick: PropTypes.func,
  handleKeyUp: PropTypes.func,
  placeholder: PropTypes.string,
}

export default SearchInput
