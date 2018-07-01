// app/javascript/genre_sliders_plus/actions/buildMoviesList.js

import LinkedList from '../structures/doubly_linked_list/LinkedList';

export function buildMoviesList(props) {
  const movies = props.movies;
  const slideLength = props.slideLength;
  const last = movies.length - 1;
  const list = new LinkedList();
  let i = 1;
  let j = 1;
  let arr = [];

  for (let movie of movies) {
    arr.push(movie);
    j++;

    if (i < slideLength && j < last) {
      i++;

    } else if (j === last) {
      list.add(arr);

    } else {
      list.add(arr);
      arr = [];
      i = 1;
    }
  }

  return list;
}
