// app/javascript/genre/components/App.jsx

import React from 'react';

import GenreDisplay from './containers/GenreDisplay';

const App = (props) => (
  <GenreDisplay genreId={props.genreId} />
)

export default App
