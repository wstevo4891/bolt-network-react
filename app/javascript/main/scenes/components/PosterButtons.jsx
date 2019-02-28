// app/javascript/main/scenes/components/PosterButtons.jsx

import React from 'react'

import VolumeButton from './VolumeButton'
import LikeButton from './LikeButton'
import UnlikeButton from './UnlikeButton'
import MyListButton from './MyListButton'

const PosterButtons = (props) => (
  <ul className="poster-buttons">
    <VolumeButton liked={props.liked} />

    <LikeButton liked={props.liked} toggleLike={props.toggleLike} />

    <UnlikeButton liked={props.liked} toggleUnlike={props.toggleUnlike} />

    <MyListButton movieId={props.movieId} />
  </ul>
)

export default PosterButtons
