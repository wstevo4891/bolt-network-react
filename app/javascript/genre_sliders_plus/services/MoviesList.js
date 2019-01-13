// app/javascript/genre_sliders_plus/services/MoviesList.js

import LinkedList from '../structures/doubly_linked_list/LinkedList';

// Service for building linked list of movie objects
export default class MoviesList {
  constructor(props) {
    this.movies = props.movies;
    this.slideLength = props.slideLength;
    this.last = props.movies.length - 1;
    this.list = new LinkedList();
    this.slideIndex = 1;
    this.movieIndex = 1;
    this.arr = [];
  }

  call = () => {
    this.buildList();

    return this.list;
  }

  buildList = () => {
    for (let movie of this.movies) {
      this.arr.push(movie);
      this.movieIndex++;
  
      this.determineAction();
    }
  }

  determineAction = () => {
    if (this.movieIndex === this.last) {
      this.list.add(this.arr);

    } else if (this.slideIndex < this.slideLength) {
      this.slideIndex++;

    } else {
      this.list.add(this.arr);
      this.arr = [];
      this.slideIndex = 1;
    }
  }
}
