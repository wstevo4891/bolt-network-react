// app/javascript/main/App.js

import React, { Component } from 'react';
import { connect } from 'react-redux'

import Layout from './scenes/Layout'

import { fetchMoviesIndex } from './store/actions/moviesIndexActions'

class App extends Component {
  render() {
    if (this.props.genres.length === 0) return null

    return <Layout />
  }

  componentDidMount() {
    this.props.dispatch(fetchMoviesIndex())
  }
}

function mapStateToProps(state) {
  return {
    genres: state.moviesIndex.genres
  }
}

export default connect(mapStateToProps)(App)
