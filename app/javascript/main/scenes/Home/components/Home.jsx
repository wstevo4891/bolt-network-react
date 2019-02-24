// app/javascript/main/scenes/Home/components/Home

import React from 'react'

import Carousel from '../Carousel/components/Carousel'
import GenreSlidersContainer from '../GenreSliders/components/GenreSlidersContainer'

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
