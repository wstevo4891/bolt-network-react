// app/javascript/genre_sliders/components/SliderContent.jsx

import React, { Component } from 'react';

import Poster from './Poster';

export class SliderContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slides: this.props.slides,
      slideLength: this.props.slideLength,
      start: this.props.start
    }
    this.transformations = {
      2: '-150%',
      3: '-133.33333333333334%',
      4: '-125%',
      5: '-120%',
      6: '-116.66666666666667%'
    }

    this.handleMouseOver = this.handleMouseOver.bind(this);
  }

  handleMouseOver() {}

  render() {
    const slides = this.state.slides;
    const slideLength = this.state.slideLength;
    const slideOver = {
      transform: `translate3d(${this.transformations[slideLength]}, 0px, 0px)`
    };

    if (slides && slides.length > 0) {
      if (this.state.start === true) {
        return (
          <div className="sliderContent" style={{ transform: '' }}>
            {
              slides.map((slide, index) =>
                <Poster key={index} movie={slide} />
              )
            }
          </div>
        );
      } else {
        return (
          <div className="sliderContent" style={slideOver}>
            {
              slides.map((slide, index) =>
                <Poster key={index} movie={slide} />
              )
            }
          </div>
        );
      }

    } else {
      return null;
    }
  }
}
