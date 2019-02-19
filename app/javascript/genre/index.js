// app/javascript/quotes/index.js

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

const genre = document.querySelector('#genre');

ReactDOM.render(
  <App genreId={genre.dataset.genre} />,
  genre
)
