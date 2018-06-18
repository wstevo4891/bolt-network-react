// app/javascript/movies/components/Poster.jsx

import React from 'react';

const Poster = (props) => {
  if (typeof props.movie != 'undefined') {
    const photoUrl = props.movie.photo.url;

    const posterImage = {
      backgroundImage: `url(${photoUrl})`,
      backgroundSize: '100% 100%'
    }

    return (
      <div className='poster-container'>
        <div className='poster' style={posterImage}></div>
      </div>
    );
  } else {
    return(<div></div>);
  }
}

export default Poster;
