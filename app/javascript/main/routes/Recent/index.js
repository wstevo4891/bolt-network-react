import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Components
import {
  DisplayContainer,
  Results,
  TitleRow,
} from '@components'

// Actions
import { fetchRecentMovies } from '../../store/actions/recentMoviesActions'

class Recent extends Component {
  render() {
    const { movies, slideLength } = this.props

    if (movies.length === 0) return null

    return (
      <DisplayContainer>
        <TitleRow title="Recently Added" />
        <Results movies={movies} name="Recent" slideLength={slideLength} />
      </DisplayContainer>
    )
  }

  componentDidMount() {
    if (this.props.movies.length > 0) return

    this.props.dispatch(fetchRecentMovies())
  }
}

Recent.propTypes = {
  dispatch: PropTypes.func.isRequired,
  movies: PropTypes.array.isRequired,
  slideLength: PropTypes.number.isRequired,
}

function mapStateToProps(state) {
  return {
    movies: state.recentMovies.movies
  }
}

export default connect(mapStateToProps)(Recent)
