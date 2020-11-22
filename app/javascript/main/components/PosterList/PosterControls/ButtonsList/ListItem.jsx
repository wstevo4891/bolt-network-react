// Poster Buttons List Item

import React from 'react'
import PropTypes from 'prop-types'

const ListItem = (props) => (
  <li className={`poster-btn ${props.type} ${props.status}`}>
    {props.children}
  </li>
)

ListItem.propTypes = {
  type: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

export default ListItem
