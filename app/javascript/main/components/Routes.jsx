// app/javascript/main/components/Routes.jsx

import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from '../scenes/Home/components/Home'
import GenreDisplay from '../scenes/Genre/components/GenreDisplay'
import MovieDisplay from '../scenes/Movie/components/MovieDisplay'
import RecentlyAdded from '../scenes/Recent/components/RecentlyAdded'
import MyList from '../scenes/MyList/components/MyList'
import SearchResults from '../scenes/Search/components/SearchResults'

const Routes = (props) => (
  <Switch>
    <Route exact path="/">
      <Home slideLength={props.slideLength} genres={props.genres} />
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
      <RecentlyAdded slideLength={props.slideLength} />
    </Route>

    <Route path="/my-list">
      <MyList slideLength={props.slideLength} />
    </Route>

    <Route
      path="/search"
      render={(routeProps) => <SearchResults {...props} {...routeProps} />}
    />
  </Switch>
)

export default Routes