// app/javascript/main/scenes/Home/GenreSliders/components/PaginationList.jsx

import React from 'react'

const PaginationList = (props) => {
  // ============================================
  // Function for determining which <li>
  // will have the "active" class
  // ============================================
  const deterClass = (index) => {
    if (index === props.position - 1) {
      return "active"
    } else return ""
  }

  return(
    <ul className="pagination-indicator">
      {/* Make an array of 1's with the LinkedList's length */}
      {Array(props.listLength).fill(1).map((item, index) =>
        // ================================================
        // Create an <li> for each item in the array
        // Use deterClass() to assign the "active" class
        // ================================================
        <li key={index} className={deterClass(index)}></li>
      )}
    </ul>
  )
}

export default PaginationList
