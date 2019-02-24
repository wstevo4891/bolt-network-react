// app/javascript/navbar/components/SearchClose.jsx

import React from 'react'
import { Route } from 'react-router-dom'

const SearchClose = (props) => (
  <Route render={({ history }) => (
    <i
      className={`fa fa-times ${props.display}`}
      id="closeIcon"
      aria-hidden="true"
      onClick={() => {
        const search = document.getElementById('search')
        search.value = ''
        props.update(null)
        history.push(props.location)
      }}
    ></i>
  )} />
)

export default SearchClose
