// app/javascript/genre_sliders/components/SliderContent.jsx

import React, { Component } from 'react';

import Poster from './Poster';

export class SliderContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slides: this.props.slides,
      slideLength: this.props.slideLength,
      start: this.props.start,
      hoverItem: null
    }

    this.transformations = {
      2: '-150%',
      3: '-133.33333333333334%',
      4: '-125%',
      5: '-120%',
      6: '-116.66666666666667%'
    }

    this.hoverStyle = {
      transform: 'scale(1.75) translate3d(0px, 0px, 0px)',
      transitionDuration: '400ms',
      transitionTimingFunction: 'cubic-bezier(0.5, 0, 0.1, 1)',
      transitionDelay: '0ms'
    }

    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.determineTranslateX = this.determineTranslateX.bind(this);
    this.buildPosterStyle = this.buildPosterStyle.bind(this);
  }

  handleMouseOver(event) {
    const target = event.target.closest('.poster-container');
    const slideIndex = parseInt(target.classList[1].slice(-1), 10);
    
    this.setState({
      hoverItem: slideIndex
    });
  }

  handleMouseOut(event) {
    // const mouseOut = 'transform: translate3d(0px, 0px, 0px); transition-duration: 400ms; transition-timing-function: cubic-bezier(0.5, 0, 0.1, 1); transition-delay: 0ms;';
    // const target = event.target.closest('.poster-container');
    // target.setAttribute('style', mouseOut);

    this.setState({
      hoverItem: null
    });
  }

  determineTranslateX() {
    const width = document.getElementsByClassName('sliderContent')[0].clientWidth;
    const slidesNum = this.state.slides.length;
    return Math.floor((width / slidesNum) - 4);
  }

  buildPosterStyle(index) {
    const hoverItem = this.state.hoverItem;

    if (hoverItem || hoverItem === 0) {
      const slideLength = this.state.slideLength;
      const translateX = this.determineTranslateX();
      let transform;

      if (index < hoverItem) {
        if (hoverItem === slideLength - 1) {
          transform = `translate3d(-${translateX * 2}px, 0px, 0px)`;
        } else {
          transform = `translate3d(-${translateX}px, 0px, 0px)`;
        }

        return {
          transform: transform,
          transitionDuration: '400ms',
          transitionTimingFunction: 'cubic-bezier(0.5, 0, 0.1, 1)',
          transitionDelay: '0ms'
        };

      } else if (index === hoverItem) {
        let translateHalf;

        if (index === 0) {
          translateHalf = Math.floor((translateX / 2) + 5);
          transform = `scale(1.75) translate3d(${translateHalf}px, 0px, 0px)`;
          return {
            transform: transform,
            transitionDuration: '400ms',
            transitionTimingFunction: 'cubic-bezier(0.5, 0, 0.1, 1)',
            transitionDelay: '0ms'
          };

        } else if (index === slideLength - 1) {
          translateHalf = Math.floor((translateX / 2) + 8);
          transform = `scale(1.75) translate3d(-${translateHalf}px, 0px, 0px)`;
          return {
            transform: transform,
            transitionDuration: '400ms',
            transitionTimingFunction: 'cubic-bezier(0.5, 0, 0.1, 1)',
            transitionDelay: '0ms'
          };

        } else {
          return {
            transform: 'scale(1.75) translate3d(0px, 0px, 0px)',
            transitionDuration: '400ms',
            transitionTimingFunction: 'cubic-bezier(0.5, 0, 0.1, 1)',
            transitionDelay: '0ms'
          };
        }

      } else if (index > hoverItem) {
        if (hoverItem === slideLength - 1) {
          return {};

        } else if (hoverItem === 0) {
          transform = `translate3d(${translateX * 2}px, 0px, 0px)`;
          return {
            transform: transform,
            transitionDuration: '400ms',
            transitionTimingFunction: 'cubic-bezier(0.5, 0, 0.1, 1)',
            transitionDelay: '0ms'
          };

        } else {
          transform = `translate3d(${translateX}px, 0px, 0px)`;
          return {
            transform: transform,
            transitionDuration: '400ms',
            transitionTimingFunction: 'cubic-bezier(0.5, 0, 0.1, 1)',
            transitionDelay: '0ms'
          };
        }

      }

    } else {
      return {
        transform: 'translate3d(0px, 0px, 0px)',
        transitionDuration: '400ms',
        transitionTimingFunction: 'cubic-bezier(0.5, 0, 0.1, 1)',
        transitionDelay: '0ms'
      };;
    }
  }

  componentDidUpdate() {
    console.log('SliderContent Updated');
    console.log(this.state);
  }

  render() {
    const slides = this.state.slides;
    const slideLength = this.state.slideLength;
    const slideOver = {
      transform: `translate3d(${this.transformations[slideLength]}, 0px, 0px)`
    };

    if (slides && slides.length > 0) {
      if (this.state.start === true) {
        return (
          <div className="sliderContent">
            {
              slides.map((slide, index) =>
                <Poster key={index}
                        index={index}
                        movie={slide}
                        slideLength={slideLength}
                        start={this.state.start}
                        mouseOver={this.handleMouseOver}
                        mouseOut={this.handleMouseOut}
                        buildPosterStyle={this.buildPosterStyle} />
              )
            }
          </div>
        );
      } else {
        return (
          <div className="sliderContent" style={slideOver}>
            {
              slides.map((slide, index) =>
                <Poster key={index}
                        index={index}
                        movie={slide}
                        slideLength={slideLength}
                        start={this.state.start}
                        mouseOver={this.handleMouseOver}
                        mouseOut={this.handleMouseOut} />
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
