// app/javascript/main/scenes/components/PosterButtons.jsx

import React from 'react'

const PosterButtons = (props) => (
  <ul className="poster-buttons">
    <li className="poster-btn poster-btn-volume">
      <button onClick={() => props.toggleVolume}>
        <i className="fa fa-volume-up"></i>
        {/* <i className="fa fa-volume-off"></i> */}
      </button>
    </li>

    <li className="poster-btn poster-btn-like">
      <button onClick={() => props.likeMovie}>
        <i className="fa fa-thumbs-o-up"></i>
        {/* <i className="fa fa-thumbs-up"></i> */}
      </button>
    </li>

    <li className="poster-btn poster-btn-unlike">
      <button onClick={() => props.unlikeMovie}>
        <i className="fa fa-thumbs-o-down"></i>
        {/* <i className="fa fa-thumbs-down"></i> */}
      </button>
    </li>

    <li className="poster-btn poster-btn-my-list">
      <button onClick={() => props.toggleMyList}>
        <i className="fa fa-plus"></i>
        {/* <i className="fa fa-check"></i> */}
      </button>
    </li>
  </ul>
)

export default PosterButtons
