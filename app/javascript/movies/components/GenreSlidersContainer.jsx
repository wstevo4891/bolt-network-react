// app/javascript/movies/components/GenreSlidersContainer.jsx

import React from 'react';

import { GenreSliderRow } from './GenreSliderRow';

const GenreSlidersContainer = (props) => {
  const genres = props.genres;

  if (genres && genres.length > 0) {
    return(
      <div className='genre-sliders-container'>
        {
          genres.map((genre) =>
            <GenreSliderRow key={genre.id} genre={genre} movies={props.moviesIndex} />
          )
        }
      </div>
    );
  } else {
    return(
      <div className='genre-sliders-container'></div>
    );
  }
}

export default GenreSlidersContainer;
