// app/javascript/movies/components/Slide.jsx

import React from 'react';

import Poster from './Poster';

const Slide = (props) => {
  return (
    <div className='slide'>
      {
        props.movies.map((movie, index) =>
          <Poster key={index} movie={movie} />
        )
      }
    </div>
  )
}

export default Slide;
