// Poster Buttons List

import React from 'react'
import PropTypes from 'prop-types'

import ListItem from './ListItem'
import { ToggleIconButton } from '../../../../IconButton'
import ToggleListButton from '../../../../ToggleListButton'

const ButtonsList = (props) => (
  <ul className="poster-buttons">
    <ListItem
      type="poster-btn-volume"
      status={props.statusMap.volume}
    >
      <ToggleIconButton
        status={true}
        iconOptions={['fa-volume-off', 'fa-volume-up']}
      />
    </ListItem>

    <ListItem
      type="poster-btn-like"
      status={props.statusMap.like}
    >
      <ToggleListButton
        movie={props.movie}
        iconOptions={['fa-thumbs-o-up', 'fa-thumbs-up']}
        listName="LikedList"
        updateContainer={props.toggleLike}
      />
    </ListItem>

    <ListItem
      type="poster-btn-unlike"
      status={props.statusMap.unlike}
    >
      <ToggleListButton
        movie={props.movie}
        iconOptions={['fa-thumbs-o-down', 'fa-thumbs-down']}
        listName="UnlikedList"
        updateContainer={props.toggleUnlike}
      />
    </ListItem>

    <li className="poster-btn poster-btn-my-list">
      <ToggleListButton
        movie={props.movie}
        iconOptions={['fa-plus', 'fa-check']}
        listName="MyList"
      />
    </li>
  </ul>
)

ButtonsList.propTypes = {
  statusMap: PropTypes.object.isRequired,
  movie: PropTypes.object.isRequired,
  toggleLike: PropTypes.func.isRequired,
  toggleUnlike: PropTypes.func.isRequired
}

export default ButtonsList
