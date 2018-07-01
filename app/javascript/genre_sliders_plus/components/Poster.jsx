// app/javascript/movies/components/Poster.jsx

import React from 'react';

import * as actions from '../actions/buildPosterStyle';

const Poster = (props) => {
  const movie = props.movie;

  if (typeof movie === 'object') {
    const posterImage = {
      backgroundImage: `url(${movie.photo.url})`,
      backgroundSize: '100% 100%'
    }

    const containerClass = actions.buildContainerClass(props);

    let posterStyle;

    if (props.start) {
      posterStyle = actions.buildPosterStyle(props);
    } else {
      posterStyle = actions.buildNextPosterStyle(props);
    }

    return (
      <a href={`/movies/${movie.id}`}>
        <div
          className={containerClass}
          style={posterStyle}
          onMouseOver={props.mouseOver}
          onMouseOut={props.mouseOut}
        >
          <div className='poster' style={posterImage}></div>
        </div>
      </a>
    );
  } else {
    return null;
  }
}

export default Poster;
