// Poster Buttons List

import React from 'react'
import PropTypes from 'prop-types'

import ListItem from './ListItem'
import { ToggleIconButton, ToggleListButton } from '@components'

const OPTION_KEY = "icon"

const ButtonsList = (props) => (
  <ul className="poster-buttons">
    <ListItem
      type="poster-btn-volume"
      status={props.statusMap.volume}
    >
      <ToggleIconButton
        status={true}
        options={['fa-volume-off', 'fa-volume-up']}
        optionKey={OPTION_KEY}
      />
    </ListItem>

    <ListItem
      type="poster-btn-like"
      status={props.statusMap.like}
    >
      <ToggleListButton
        movie={props.movie}
        options={['fa-thumbs-o-up', 'fa-thumbs-up']}
        optionKey={OPTION_KEY}
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
        options={['fa-thumbs-o-down', 'fa-thumbs-down']}
        optionKey={OPTION_KEY}
        listName="UnlikedList"
        updateContainer={props.toggleUnlike}
      />
    </ListItem>

    <li className="poster-btn poster-btn-my-list">
      <ToggleListButton
        movie={props.movie}
        options={['fa-plus', 'fa-check']}
        optionKey={OPTION_KEY}
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
