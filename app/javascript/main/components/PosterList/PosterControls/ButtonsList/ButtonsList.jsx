// Poster Buttons List

import React from 'react'
import PropTypes from 'prop-types'

import ListItem from './ListItem'
import { ToggleIconButton, ToggleListButton } from '@components'

const ButtonsList = (props) => (
  <ul className="poster-buttons">
    <ListItem
      type="poster-btn-volume"
      status={props.statusMap.volume}
    >
      <ToggleIconButton
        options={['fa-volume-up', 'fa-volume-off']}
      />
    </ListItem>

    <ListItem
      type="poster-btn-like"
      status={props.statusMap.like}
    >
      <ToggleListButton
        options={['fa-thumbs-up', 'fa-thumbs-o-up']}
        movie={props.movie}
        listName="LikedList"
        updateContainer={props.toggleLike}
      />
    </ListItem>

    <ListItem
      type="poster-btn-unlike"
      status={props.statusMap.unlike}
    >
      <ToggleListButton
        options={['fa-thumbs-down', 'fa-thumbs-o-down']}
        movie={props.movie}
        listName="UnlikedList"
        updateContainer={props.toggleUnlike}
      />
    </ListItem>

    <li className="poster-btn poster-btn-my-list">
      <ToggleListButton
        options={['fa-check', 'fa-plus']}
        movie={props.movie}
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
