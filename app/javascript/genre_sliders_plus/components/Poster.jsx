// app/javascript/movies/components/Poster.jsx

import React from 'react';

// import * as actions from '../actions/buildPosterStyle';
import PosterService from '../services/PosterService';

const Poster = (props) => {
  const movie = props.movie;
  console.log(`hoverItem: ${props.hoverItem}`);

  if (typeof movie !== 'object') return null;

  const posterImage = {
    backgroundImage: `url(${movie.photo.url})`,
    backgroundSize: '100% 100%'
  }

  const service = new PosterService(props);

  // const containerClass = actions.buildContainerClass(props);
  const containerClass = service.containerClass();

  // let posterStyle;

  // if (props.start) {
  //   posterStyle = actions.buildPosterStyle(props);
  // } else {
  //   posterStyle = actions.buildNextPosterStyle(props);
  // }
  const posterStyle = service.posterStyle();

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
}

export default Poster;
