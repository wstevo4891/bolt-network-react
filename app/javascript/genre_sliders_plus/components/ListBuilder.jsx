// app/javascript/genre_sliders_plus/components/ListBuilder.jsx

import React from 'react';

import * as actions from '../actions/buildMoviesList';
import GenreSliderRow from './GenreSliderRow';

const ListBuilder = (props) => {
  const moviesList = actions.buildMoviesList(props);

  if (moviesList) {
    return (
      <div className="list-row">
        <GenreSliderRow
          genre={props.genre}
          moviesList={moviesList}
          slideLength={props.slideLength} />
      </div>
    );
  } else {
    return null;
  }
}

export default ListBuilder;
