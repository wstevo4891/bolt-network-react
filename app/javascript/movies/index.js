// app/javascript/movies/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App';

const movies = document.querySelector('#movies');
console.log(movies);

ReactDOM.render(
  <App movies={movies.dataset.movies} genres={movies.dataset.genres} />,
  movies
);
