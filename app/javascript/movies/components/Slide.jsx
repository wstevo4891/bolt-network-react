// app/javascript/movies/components/Slide.jsx

import React from 'react';
import { Poster } from './Poster';

export class Slide extends React.Component {
  // componentDidMount() {
  //   console.log('Slide mounted!');
  //   console.log('this.props.movies: ' + JSON.stringify(this.props.movies));
  // }

  render() {
    return(
      <div className='slide'>
        {
          this.props.movies.map((movie, index) =>
            <Poster key={index} movie={movie} />
          )
        }
      </div>
    );
  }
}
