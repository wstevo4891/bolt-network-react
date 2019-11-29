import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import { shallow } from 'enzyme'

import comedyMovies from '../../../../__fixtures__/comedyMovies'

import GenreSlider from 'main/scenes/Home/components/GenreSlider'

describe('GenreSlider', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')

    ReactDOM.render(
      <Router>
        <GenreSlider
          genre="Comedy"
          movies={comedyMovies}
          slideLength={5}
        />
      </Router>,
      div
    )

    ReactDOM.unmountComponentAtNode(div)
  })
})
