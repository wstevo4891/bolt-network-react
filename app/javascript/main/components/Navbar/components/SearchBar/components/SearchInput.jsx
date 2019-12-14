// app/javascript/main/components/Navbar/components/SearchInput.jsx

import React from 'react'

const SearchInput = (props) => (
  <input
    type="text"
    name="query"
    id="search"
    className="form-control"
    maxLength="80"
    placeholder={props.placeholder}
    aria-label={props.placeholder}
    onKeyUp={(event) => props.handleKeyUp(event)}
    onClick={(event) => props.handleClick(event)}
  />
)

export default SearchInput
