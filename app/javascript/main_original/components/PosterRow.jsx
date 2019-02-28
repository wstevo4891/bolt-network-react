// app/javascript/genre_sliders/components/SliderContent.jsx

import React, { Component } from 'react';

import Poster from '../../genre_sliders/components/Poster';
import ContainerStyle from '../../genre_sliders/services/ContainerStyle';
import StaticPosterService from '../services/StaticPosterService'

class PosterRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: props.movies,
      slideLength: props.slideLength,
      hoverItem: null
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      movies: nextProps.movies,
      slideLength: nextProps.slideLength
    });
  }

  render() {
    const { movies, slideLength, hoverItem } = this.state;

    if (movies.length === 0) return null

    return (
      <div className="sliderContent">
        {
          movies.map((movie, index) =>
            <Poster
              key={index}
              index={index}
              movie={movie}
              slideLength={slideLength}
              hoverItem={hoverItem}
              mouseOver={this.handleMouseOver}
              mouseOut={this.handleMouseOut}
              service={StaticPosterService}
            />
          )
        }
      </div>
    );
  }

  handleMouseOver = (event) => {
    const target = event.target.closest('.poster-container');
    const slideIndex = parseInt(target.classList[1].slice(-1), 10);
    
    this.setState({
      hoverItem: slideIndex
    });
  }

  handleMouseOut = () => {
    this.setState({
      hoverItem: null
    });
  }
}

export default PosterRow;