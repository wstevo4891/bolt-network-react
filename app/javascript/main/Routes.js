// app/javascript/main/components/Routes.jsx

import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import Home from './scenes/Home'
import Genre from './scenes/Genre'
import Movie from './scenes/Movie'
import Recent from './scenes/Recent'
import MyList from './scenes/MyList'
import Search from './scenes/Search'

const Routes = (props) => (
  <Switch>
    <Route exact path="/">
      <Home {...props} />
    </Route>

    <Route
      path={`/genres/:slug`}
      render={(routeProps) =>
        <Genre
          {...props}
          genreSlug={routeProps.match.params.slug}
          key={routeProps.match.params.slug}
        />
      }
    />

    <Route
      path={`/movies/:movieID`}
      render={(routeProps) =>
        <Movie
          {...props}
          {...routeProps}
        />
      }
    />

    <Route path="/recent">
      <Recent slideLength={props.slideLength} />
    </Route>

    <Route path="/my-list">
      <MyList slideLength={props.slideLength} />
    </Route>

    <Route
      path="/search"
      render={(routeProps) =>
        <Search
          {...props}
          {...routeProps}
        />
      }
    />
  </Switch>
)

function mapStateToProps(state) {
  return {
    genres: state.moviesIndex.genres,
    genresIndex: state.moviesIndex.genresIndex,
    moviesIndex: state.moviesIndex.moviesIndex,
    search: state.search,
    suggestions: state.suggestions
  }
}

export default connect(mapStateToProps)(Routes)
