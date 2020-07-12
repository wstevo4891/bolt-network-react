// app/javascript/main/App.js

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import { connect } from 'react-redux'

import Routes from './Routes'

import {
  MainContainer,
  Navbar,
  Footer
} from './components'

import { fetchMoviesIndex } from './store/actions/moviesIndexActions'

class App extends Component {
  render() {
    if (this.props.genres.length === 0) return null

    return(
      <Router>
        <Route render={(routeProps) =>
          <Navbar {...routeProps} />
        } />

        <MainContainer>
          {slideLength => <Routes slideLength={slideLength} />}
        </MainContainer>

        <Footer />
      </Router>
    )
  }

  componentDidMount() {
    this.props.dispatch(fetchMoviesIndex())
  }
}

App.propTypes = {
  dispatch: PropTypes.func,
  genres: PropTypes.array
}

function mapStateToProps(state) {
  return {
    genres: state.moviesIndex.genres
  }
}

export default connect(mapStateToProps)(App)
