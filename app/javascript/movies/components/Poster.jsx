// app/javascript/movies/components/Poster.jsx

import React from 'react';

export class Poster extends React.Component {
  // componentDidMount() {
  //   console.log('Poster mounted!');
  //   console.log('this.props.movie: ' + JSON.stringify(this.props.movie));
  // }

  render() {
    if (typeof this.props.movie != 'undefined') {
      let photo_url = this.props.movie.photo.url;
      const posterImage = {
        backgroundImage: `url(${photo_url})`,
        backgroundSize: '100% 100%'
      }

      return(
        <div className='poster-container'>
          <div className='poster' style={posterImage}></div>
        </div>
      );
    } else {
      return(
        <div></div>
      );
    }
  }
}
