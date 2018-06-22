// app/javascript/movies/components/Poster.jsx

import React from 'react';

const Poster = (props) => {
  if (typeof props.movie === 'object') {
    const photoUrl = props.movie.photo.url;

    const posterImage = {
      backgroundImage: `url(${photoUrl})`,
      backgroundSize: '100% 100%'
    }

    const handleMouseOver = function(event) {
      // const mouseOver = {
      //   transform: 'scale(1.75)',
      //   transitionDuration: '400ms',
      //   transitionTimingFunction: 'cubic-bezier(0.5, 0, 0.1, 1)',
	    //   transitionDelay: '0ms'
      // };
      const mouseOver = 'transform: scale(1.75); transition-duration: 400ms; transition-timing-function: cubic-bezier(0.5, 0, 0.1, 1); transition-delay: 0ms;';
      const target = event.target.closest('.poster-container');
      target.setAttribute('style', mouseOver);
    }

    const handleMouseOut = function(event) {
      const target = event.target.closest('.poster-container');
      target.setAttribute('style', '');
    }

    return (
      <div className='poster-container' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
        <div className='poster' style={posterImage}></div>
      </div>
    );
  } else {
    return null;
  }
}

export default Poster;
