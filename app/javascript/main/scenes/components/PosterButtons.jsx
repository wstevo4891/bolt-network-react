// app/javascript/main/scenes/components/PosterButtons.jsx

import React from 'react'

const PosterButtons = (props) => (
  <ul className="poster-buttons">
    <li className="poster-btn poster-btn-volume">
      <button onClick={(event) => props.toggleVolume(event)}>
        <i className="fa fa-volume-up"></i>
      </button>
    </li>

    <li className="poster-btn poster-btn-like">
      <button onClick={(event) => props.likeMovie(event)}>
        <i className="fa fa-thumbs-o-up"></i>
      </button>
    </li>

    <li className="poster-btn poster-btn-unlike">
      <button onClick={(event) => props.unlikeMovie(event)}>
        <i className="fa fa-thumbs-o-down"></i>
      </button>
    </li>

    <li className="poster-btn poster-btn-my-list">
      <button onClick={(event) => props.toggleMyList(event, props.movieId)}>
        <i className={props.inList ? 'fa fa-check' : 'fa fa-plus'}></i>
      </button>
    </li>
  </ul>
)

export default PosterButtons
