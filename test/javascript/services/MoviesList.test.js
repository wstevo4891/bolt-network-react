// test/javascript/services/react_jsx.test.js

import * as data from '../fixtures/comedy.json'
import MoviesList from 'genre_sliders/services/MoviesList'

test('can use MoviesList', () => {
  const moviesData = Array.from(data)
  const props = { movies: moviesData, slideLength: 5 }

  const list = new MoviesList(props).call()
  console.log(list.head.data)
  expect(list.head.data).toHaveLength(5)
  expect(typeof list.head.data).toBe('object')

  let slide = list.head

  while (slide !== null) {
    expect(slide.data.length).toEqual(props.slideLength)
    slide = slide.next
  }
})
