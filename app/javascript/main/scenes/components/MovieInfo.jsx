// app/javascript/main/scenes/components/MovieInfo.jsx

import React from 'react'

const MovieInfo = (props) => {
  if (props.hoverItem !== props.index) {
    return <span></span>

  } else {
    // let genres

    // if (props.movie.genres.length > 1) {
    //   genres = props.movie.genres.join(', ')
    // } else {
    //   genres = props.movie.genres.join('')
    // }

    return(
      <span>
        <div className="movie-info">
          <i className="fa fa-play-circle"></i>
          <h3>{props.movie.title}</h3>
          <span>{props.movie.rated}</span>
          <span>{props.movie.run_time}</span>
          {/* <p>{props.movie.genres}</p> */}
        </div>
      </span>
    )
  }
}

export default MovieInfo
