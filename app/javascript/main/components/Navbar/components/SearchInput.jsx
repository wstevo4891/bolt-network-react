// app/javascript/main/components/Navbar/components/SearchInput.jsx

import React from 'react'
import { Route } from 'react-router-dom'

const SearchInput = (props) => (
  <Route render={({ history }) => (
    <input
      type="text"
      name="query"
      id="search"
      className="form-control"
      placeholder="Titles, people, genres"
      aria-label="Titles, people, genres"
      onKeyUp={(event) => {
        console.log(history)
        const query = event.target.value

        if (query && query !== '') {
          history.push(`/search?q=${query}`)
        } else {
          history.push(props.location)
        }

        props.update(query)
      }}
    />
  )} />
)

export default SearchInput
