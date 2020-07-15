// app/javascript/main/components/Routes.jsx

import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import {
  Home,
  Genre,
  Movie,
  Recent,
  MyList,
  Search
} from './scenes'

const Routes = (props) => (
  <Switch>
    <Route exact path="/">
      <Home {...props} />
    </Route>

    <Route
      path={`/genres/:slug`}
      render={(routeProps) => {
        const genreSlug = routeProps.match.params.slug
        const genre = props.genresIndex[genreSlug].text
        const movies = props.moviesIndex[genre]

        return (
          <Genre
            // TODO: Only pass required props
            genre={genre}
            movies={movies}
            slideLength={props.slideLength}
          />
        )
      }}
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

Routes.propTypes = {
  slideLength: PropTypes.number.isRequired,
}

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
