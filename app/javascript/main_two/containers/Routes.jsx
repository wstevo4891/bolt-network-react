// app/javascript/main_two/containers/Routes.jsx

import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './Home'
import GenreDisplay from '../../genre/containers/GenreDisplay'
import SearchResults from '../../main/components/SearchResults'

const Routes = (props) => (
  <Switch>
    <Route exact path="/">
      <Home slideLength={props.slideLength} />
    </Route>
    <Route
      path={`/genres/:genreId`}
      render={(routeProps) => <GenreDisplay {...props} {...routeProps} />}
    />
    <Route path="/recent">
      <Home slideLength={props.slideLength} />
    </Route>
    <Route path="/my-list">
      <Home slideLength={props.slideLength} />
    </Route>
    <Route path="/search">
      <SearchResults results={props.results} slideLength={props.slideLength} />
    </Route>
  </Switch>
)

export default Routes
