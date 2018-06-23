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
      const mouseOver = 'transform: scale(1.75) translate3d(0px, 0px, 0px); transition-duration: 400ms; transition-timing-function: cubic-bezier(0.5, 0, 0.1, 1); transition-delay: 0ms;';
      const target = event.target.closest('.poster-container');
      target.setAttribute('style', mouseOver);
    }

    const handleMouseOut = function(event) {
      const target = event.target.closest('.poster-container');
      target.setAttribute('style', 'transform: scale(1.0); transition-duration: 400ms; transition-timing-function: cubic-bezier(0.5, 0, 0.1, 1); transition-delay: 0ms;');
    }

    const renderContainerClass = function(props) {
      if (props.start) {
        if (props.index <= props.slideLength) {
          return `poster-container slide-item-${props.index}`;
        } else {
          return 'poster-container';
        }
      } else {
        if (props.index <= props.slideLength + 1) {
          return `poster-container slide-item-${props.index}`;
        } else {
          return 'poster-container';
        }
      }
    }

    const posterStyle = props.buildPosterStyle(props.index);

    return (
      <div className={renderContainerClass(props)}
           style={posterStyle}
           onMouseOver={props.mouseOver}
           onMouseOut={props.mouseOut}>
        <div className='poster' style={posterImage}></div>
      </div>
    );
  } else {
    return null;
  }
}

export default Poster;
