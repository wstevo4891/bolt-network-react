// app/javascript/main/components/Navbar/components/SearchClose.jsx

import React from 'react'
import PropTypes from 'prop-types'

import { Icon } from '@components'

const SearchClose = ({ handleClick, query }) => {
  const iconClass = query ? 'fa-times' : 'fa-time d-none'

  return (
    <Icon
      ariaHidden="true"
      handleClick={handleClick}
      icon={iconClass}
      id="closeIcon"
    />
  )
}

SearchClose.propTypes = {
  handleClick: PropTypes.func,
  query: PropTypes.bool,
}

export default SearchClose
