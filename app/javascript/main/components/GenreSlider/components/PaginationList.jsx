// app/javascript/main/scenes/Home/GenreSliders/components/PaginationList.jsx

import React from 'react'
import PropTypes from 'prop-types'

const PaginationList = ({ active, listLength }) => {
  // Make a range of integers using the LinkedList's length
  const items = [...Array(listLength).keys()]

  return(
    <ul className="pagination-indicator">
      {items.map(index => {
        if (index !== active) return <li key={index}></li>

        return <li key={index} className="active"></li>
      })}
    </ul>
  )
}

PaginationList.propTypes = {
  active: PropTypes.number,
  listLength: PropTypes.number
}

export default PaginationList
