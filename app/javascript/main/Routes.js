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
      <Home slideLength={props.slideLength} />
    </Route>

    <Route
      path={`/genres/:slug`}
      render={(routeProps) => {
        console.log(props)
        const genreSlug = routeProps.match.params.slug
        const genre = props.genresIndex[genreSlug].text
        const movies = props.moviesIndex[genre]

        return (
          <Genre
            genre={genre}
            movies={movies}
            slideLength={props.slideLength}
          />
        )
      }}
    />

    <Route
      path={`/movies/:movieID`}
      render={routeProps => <Movie movieID={routeProps.match.params.movieID} />
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
      render={(routeProps) => {
        const { genres, movies, people } = props.search

        return (
          <Search
            genres={genres}
            movies={movies}
            people={people}
            query={routeProps.location.search}
            slideLength={props.slideLength}
            suggestions={props.suggestions}
          />
        )
      }}
    />
  </Switch>
)

Routes.propTypes = {
  genresIndex: PropTypes.object.isRequired,
  moviesIndex: PropTypes.object.isRequired,
  slideLength: PropTypes.number.isRequired,
  search: PropTypes.object,
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
