// app/javascript/genre_sliders_plus/components/PosterContainer.jsx

import React, { Component } from 'react';

import * as actions from '../actions/buildPosterStyle';

class PosterContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: this.props.index,
      movie: this.props.movie,
      slideLength: this.props.slideLength,
      start: this.props.start,
      next: this.props.next,
      prev: this.props.prev,
      hoverItem: this.props.hoverItem
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log('PosterContainer is receiving props');

    this.setState({
      index: nextProps.index,
      movie: nextProps.movie,
      slideLength: nextProps.slideLength,
      start: nextProps.start,
      hoverItem: nextProps.hoverItem
    });
  }

  render() {
    console.log('PosterContainer is rendering');
    const movie = this.state.movie;

    if (typeof movie === 'object') {
      const posterImage = {
        backgroundImage: `url(${movie.photo.url})`,
        backgroundSize: '100% 100%'
      }
  
      const containerClass = actions.buildContainerClass(this.state);
  
      let posterStyle;
  
      if (this.state.start) {
        posterStyle = actions.buildPosterStyle(this.state);
      } else {
        posterStyle = actions.buildNextPosterStyle(this.state);
      }

      return (
        <a href={`/movies/${movie.id}`}>
          <div className={containerClass}
                style={posterStyle}
                onMouseOver={this.props.mouseOver}
                onMouseOut={this.props.mouseOut}>
            <div className='poster' style={posterImage}></div>
          </div>
        </a>
      );

    } else {
      return null;
    }
  }

  componentDidUpdate() {
    console.log('PosterContainer updated');
    console.log(this.state);
  }
}

export default PosterContainer;
