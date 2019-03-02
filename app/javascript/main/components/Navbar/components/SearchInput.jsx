// app/javascript/main/components/Navbar/components/SearchInput.jsx

import React from 'react'

const SearchInput = (props) => (
  <input
    type="text"
    name="query"
    id="search"
    className="form-control"
    maxLength="80"
    placeholder="Titles, people, genres"
    aria-label="Titles, people, genres"
    onKeyUp={(event) => {
      const query = event.target.value

      if (query && query !== '') {
        const escaped_query = encodeURIComponent(query)
        props.history.push(`/search?q=${escaped_query}`)

      } else {
        if (props.location === '/search') {
          props.history.push('/')
        } else {
          props.history.push(props.location)
        }
      }

      props.update(query)
    }}
  />
)

export default SearchInput
