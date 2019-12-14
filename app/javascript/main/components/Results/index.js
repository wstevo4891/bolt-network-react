// app/javascript/main/scenes/Search/components/Results.jsx

import React from 'react'

import PosterRow from './components/PosterRow'
import StaticSlides from './services/StaticSlides'

const Results = ({ movies, slideLength }) => {

  const slides = new StaticSlides(movies, slideLength).call()

  return(
    <div className="row">
      {slides.map((slide, index) =>
        <div
          key={index}
          className="col-12"
          style={{ marginBottom: '5.5vw' }}
        >
          <PosterRow movies={slide} slideLength={slideLength} />
        </div>
      )}
    </div>
  )
}

export default Results
