// Poster Factory Component

// Builds an array of <Poster /> components base on type

import React from 'react'

import PosterDataFactory from './services/PosterDataFactory/index'

import Poster from '../Poster'

export default function PosterFactory(props) {

  const factory = new PosterDataFactory(props)

  return props.movies.map((movie, index) => {

    const posterData = factory.build(movie, index)

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
