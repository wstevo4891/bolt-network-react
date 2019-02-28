// app/javascript/main/scenes/components/PosterButtons.jsx

import React from 'react'

import MyListButton from './MyListButton'

const PosterButtons = (props) => (
  <ul className="poster-buttons">
    <li className="poster-btn poster-btn-volume">
      <button onClick={(event) => props.toggleVolume(event)}>
        <i className="fa fa-volume-up"></i>
      </button>
    </li>

    <li className={`poster-btn poster-btn-like ${props.liked === false ? 'hidden' : ''}`}>
      <button onClick={(event) => props.likeMovie(event)}>
        <i className="fa fa-thumbs-o-up"></i>
      </button>
    </li>

    <li className={`poster-btn poster-btn-unlike ${props.liked === true ? 'hidden' : ''}`}>
      <button onClick={(event) => props.unlikeMovie(event)}>
        <i className="fa fa-thumbs-o-down"></i>
      </button>
    </li>

    {/* <li className="poster-btn poster-btn-my-list">
      <button onClick={(event) => props.toggleMyList(event, props.movieId)}>
        <i className={props.inList ? 'fa fa-check' : 'fa fa-plus'}></i>
      </button>
    </li> */}

    <MyListButton movieId={props.movieId} />
  </ul>
)

export default PosterButtons
