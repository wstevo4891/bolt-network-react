// app/javascript/main/scenes/Search/components/Results.jsx

import React from 'react'

import PosterRow from './PosterRow'
import StaticSlides from '../services/StaticSlides'

const Results = (props) => {
  const { movies, slideLength } = props

  const slides = new StaticSlides(movies, slideLength).call()
  // console.log('slides: ' + JSON.stringify(slides))

  return(
    <div className="row">
      {slides.map((slide, index) =>
        <div key={index} className="col-12 search-results-col">
          <PosterRow movies={slide} slideLength={slideLength} />
        </div>
      )}
    </div>
  )
}

export default Results
