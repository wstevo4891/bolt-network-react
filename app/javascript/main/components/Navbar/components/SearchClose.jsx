// app/javascript/main/components/Navbar/components/SearchClose.jsx

import React from 'react'

const SearchClose = (props) => (
  <i
    className={`fa fa-times ${props.display}`}
    id="closeIcon"
    aria-hidden="true"
    onClick={() => {
      const search = document.getElementById('search')
      search.value = ''
      props.update(null)
      
      if (props.location === '/search') {
        props.history.push('/')
      } else {
        props.history.push(props.location)
      }
    }}
  ></i>
)

export default SearchClose
