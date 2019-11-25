// app/javascript/main/components/Routes.jsx

import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import Home from './Home'
import Genre from './Genre'
import Movie from './Movie'
import Recent from './Recent'
import MyList from './MyList'
import Search from './Search'

// Labs
import Counter from './Counter'

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

    <Route path="/counter">
      <Counter />
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
    search: state.search
  }
}

export default connect(mapStateToProps)(Routes)
