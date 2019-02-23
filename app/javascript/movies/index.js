// app/javascript/movies/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

const movies = document.querySelector('#movies');

ReactDOM.render(
  <App />,
  movies
);
