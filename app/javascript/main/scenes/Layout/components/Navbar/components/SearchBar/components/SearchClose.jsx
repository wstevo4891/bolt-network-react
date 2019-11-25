// app/javascript/main/components/Navbar/components/SearchClose.jsx

import React from 'react'

const SearchClose = (props) => {

  const iconClass = () => {
    if (props.query) {
      return 'fa fa-times'
    } else {
      return 'fa fa-time d-none'
    }
  }

  // const iconClass = function() {
  //   if (props.query) {
  //     return 'fa fa-times'
  //   } else {
  //     return 'fa fa-time d-none'
  //   }
  // }()

  return(
    <i
      id="closeIcon"
      aria-hidden="true"
      className={iconClass()}
      onClick={() => props.handleClick()}
    ></i>
  )
}

export default SearchClose
