// test/javascript/services/react_jsx.test.js

import * as API from 'main_two/API'
import MoviesList from 'genre_sliders/services/MoviesList'

test('can use MoviesList', () => {
  const props = { movies: API.movies.byGenre('Action'), slideLength: 5 }
  console.log(props)

  const list = new MoviesList(props).call()
  console.log(list.head)

  let slide = list.head

  while (slide !== null) {
    expect(slide.length).toEqual(props.slideLength)
    slide = slide.next
  }
})
