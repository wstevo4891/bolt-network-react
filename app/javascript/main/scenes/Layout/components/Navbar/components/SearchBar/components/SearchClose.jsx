// app/javascript/main/components/Navbar/components/SearchClose.jsx

import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const SearchClose = (props) => (
  <FontAwesomeIcon
    icon={faTimes}
    id="closeIcon"
    className={props.query ? '' : 'd-none'}
    onClick={() => props.handleClick()}
  />
)

export default SearchClose
