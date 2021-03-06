import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Banner from '@components/Banner'
import GenreSlider from '@components/GenreSlider'

const Home = (props) => (
  <main className="application">
    <Banner />

    <div className="container">
      <div className="row justify-content-center">
        <div className="supporting col-12">
          <h1>A world of movies at your fingertips</h1>
          <p>Choose from the latest titles, with new movies added every day</p>
        </div>
      </div>
    </div>

    <div className='genre-sliders-container'>
      {
        props.genres.map((genre, index) =>
          <GenreSlider
            key={index}
            genre={genre}
            movies={props.moviesIndex[genre]}
            slideLength={props.slideLength}
          />
        )
      }
    </div>

    <div className="feature">
      <div className="container">
        <h2>Available everywhere</h2>
        <p>Start watching on one device, and pick up where you left off on another device</p>
      </div>
    </div>
  </main>
)

Home.propTypes = {
  genres: PropTypes.array,
  moviesIndex: PropTypes.object,
  slideLength: PropTypes.number
}

function mapStateToProps(state) {
  return {
    genres: state.moviesIndex.genres,
    moviesIndex: state.moviesIndex.moviesIndex
  }
}

export default connect(mapStateToProps)(Home)
