// app/javascript/main_two/containers/Home

import React from 'react'

import Carousel from '../../carousel/containers/Carousel'
import GenreSlidersContainer from '../../genre_sliders/components/GenreSlidersContainer'

const Home = (props) => (
  <main className="application">
    <Carousel />

    <div className="container">
      <div className="row justify-content-center">
        <div className="supporting">
          <h2>A world of movies at your fingertips.</h2>
          <p>Choose from the latest titles, with new movies added every day.</p>
        </div>
      </div>
    </div>

    <GenreSlidersContainer {...props} />

    <div className="feature">
      <div className="container">
        <h1>Available everywhere</h1>
        <p>Start watching on one device, and pick up where you left off on another device.</p>
      </div>
    </div>
  </main>
)

export default Home
