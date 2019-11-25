// app/javascript/main/scenes/Recent/components/RecentlyAdded.jsx

import React, { Component } from 'react'
import { connect } from 'react-redux'

// Components
import Results from '../../components/Results'

// Actions
import { fetchRecentMovies } from '../../store/actions/recentMoviesActions'

class Recent extends Component {
  render() {
    const { movies, slideLength } = this.props

    if (movies.length === 0) return null

    return(
      <div className="display-container">
        <div className="row">
          <div className="col-12 mb-4">
            <h1 style={{ color: 'white' }}>Recently Added</h1>
          </div>
        </div>

        <Results movies={movies} slideLength={slideLength} />
      </div>
    )
  }

  componentDidMount() {
    if (this.props.movies.length > 0) return

    this.props.dispatch(fetchRecentMovies())
  }
}

function mapStateToProps(state) {
  return {
    movies: state.recentMovies.movies
  }
}

export default connect(mapStateToProps)(Recent)
