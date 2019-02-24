// app/javascript/main_two/containers/Routes.jsx

import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './Home'
import GenreDisplay from '../../genre/containers/GenreDisplay'
import MovieDisplay from '../../movies/containers/MovieDisplay'
import SearchResults from '../../main/components/SearchResults'

const Routes = (props) => (
  <Switch>
    <Route exact path="/">
      <Home {...props} />
    </Route>
    <Route
      path={`/genres/:genreId`}
      render={(routeProps) => <GenreDisplay {...props} {...routeProps} />}
    />
    <Route
      path={`/movies/:movieId`}
      render={(routeProps) => <MovieDisplay {...props} {...routeProps} />}
    />
    <Route path="/recent">
      <Home {...props} />
    </Route>
    <Route path="/my-list">
      <Home {...props} />
    </Route>
    <Route
      path="/search"
      render={(routeProps) => <SearchResults {...props} {...routeProps} />}
    />
  </Switch>
)

export default Routes
