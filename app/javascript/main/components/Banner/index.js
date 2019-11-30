// app/javascript/main/scenes/Home/Carousel/components/CarouselApp.jsx

import React, { Component } from 'react'
import { connect } from 'react-redux'

// Components
import MovieBanner from './components/MovieBanner'

import { fetchCarouselMovies } from '../../store/actions/carouselMoviesActions'

class Banner extends Component {
  state = {
    activeIndex: 0,
    titles: [
      'Pirates of the Caribbean: The Curse of the Black Pearl',
      'The Avengers',
      'Skyfall'
    ]
  }

  render() {
    const movies = this.props.movies

    if (movies.length === 0) return null

    const movie = movies[this.state.activeIndex]

    return <MovieBanner movie={movie} />
  }

  componentDidMount() {
    if (this.props.movies.length === 0) {
      this.props.dispatch(fetchCarouselMovies(this.state.titles))

    } else {
      this.setState({
        activeIndex: this.randomIndex(3)
      })
    }
  }

  randomIndex = max => {
    return Math.floor(Math.random() * Math.floor(max))
  }
}

function mapStateToProps(state) {
  return {
    movies: state.carouselMovies.movies
  }
}

export default connect(mapStateToProps)(Banner)
