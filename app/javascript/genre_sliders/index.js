// app/javascript/movies/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App';

const genreSliders = document.querySelector('#genre_sliders');

ReactDOM.render(
  <App />,
  genreSliders
);
