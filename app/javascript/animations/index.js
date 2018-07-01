// app/javascript/animations/index.js

import React from 'react';
import { render } from 'react-dom';
import App from './components/App';

const animations = document.querySelector('#animations-demo');

render(
  <App />,
  animations
);
