// test/javascript/services/react_jsx.test.js

import comedyMovies from '../__fixtures__/comedyMovies'
import MoviesList from 'main/components/GenreSlider/services/MoviesList'
import LinkedList from 'main/components/GenreSlider/structures/LinkedList'

describe('MoviesList', () => {
  const props = {
    slideLength: 5,
    movies: comedyMovies
  }

  it('will initialize', () => {
    const moviesList = new MoviesList(props)

    expect(moviesList.slideLength).toEqual(props.slideLength)
  })

  it('will slice the movies param', () => {
    const moviesList = new MoviesList(props)

    expect(moviesList.movies.length).toEqual(20)
  })

  it('will return a linked list', () => {
    const moviesList = new MoviesList(props).call()

    expect(moviesList).toBeInstanceOf(LinkedList)
  })

  it('will build arrays with length equal to slideLength', () => {
    const moviesList = new MoviesList(props).call()

    expect(moviesList.head.data).toHaveLength(props.slideLength)
  })
})
