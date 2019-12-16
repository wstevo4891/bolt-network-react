// app/javascript/main/scenes/Search/components/Results.jsx

import React from 'react'

import StaticSlides from './services/StaticSlides'

import PosterList from '../PosterList'

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
          <div className="sliderContent">
            <PosterList
              type="static"
              movies={slide}
              slideLength={slideLength}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Results
