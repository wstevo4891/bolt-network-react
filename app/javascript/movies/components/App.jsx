// app/javascript/quotes/components/App.jsx
import React from 'react';
import { GenreSlider } from './GenreSlider';

export class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      genres: this.props.genres,
      movies: this.props.movies
    };

    this.buildMoviesObject = this.buildMoviesObject.bind(this);
  }

  buildMoviesObject(genre) {
    const movies_object = {};
    genre.movie_ids.map((movie_id) =>
      movies_object[movie_id] = this.state.movies[movie_id]
    )
    return movies_object;
  }

  render () {
    const genres = this.state.genres;
    const movies = this.state.movies;

    return (
      <div>
        {
          genres.map((genre) =>
            <div key={genre.id} id={`${genre.name}_slider`} className='row'>
              <GenreSlider genre={genre} moviesObject={this.buildMoviesObject(genre)} />
            </div>
          )
        }
      </div>
    )
  }
}
