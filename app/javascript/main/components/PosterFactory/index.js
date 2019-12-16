// Poster Factory Component

// Builds an array of <Poster /> components base on type

import React from 'react'

import PosterDataFactory from '../../services/PosterDataFactory'

import Poster from '../Poster'

export default function PosterFactory(props) {

  const dataFactory = new PosterDataFactory(props)

  return props.movies.map((movie, index) => {

    const posterData = dataFactory.build(movie, index)

    return(
      <Poster
        key={index}
        {...posterData}
        mouseOver={props.mouseOver}
        mouseLeave={props.mouseLeave}
      />
    )
  })
}
