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
      next: this.props.next,
      prev: this.props.prev,
      hoverItem: null
    }

    this.transformations = {
      2: -150,
      3: -133.33333333333334,
      4: -125,
      5: -120,
      6: -116.66666666666667
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      slides: nextProps.slides,
      start: nextProps.start,
      next: nextProps.next,
      prev: nextProps.prev
    });
  }

  render() {
    console.log('SliderContent is rendering!');
    const slides = this.state.slides;
    const slideLength = this.state.slideLength;
    let slideOver = this.buildContainerStyle(slideLength);

    if (slides && slides.length > 0) {
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
                      mouseOut={this.handleMouseOut}
                      buildPosterStyle={this.buildPosterStyle}
                      buildNextPosterStyle={this.buildNextPosterStyle} />
            )
          }
        </div>
      );

    } else {
      return null;
    }
  }

  handleMouseOver = (event) => {
    const target = event.target.closest('.poster-container');
    const slideIndex = parseInt(target.classList[1].slice(-1), 10);
    
    this.setState({
      hoverItem: slideIndex
    });
  }

  handleMouseOut = (event) => {
    this.setState({
      hoverItem: null
    });
  }

  determineTranslateX = () => {
    const width = document.getElementsByClassName('poster-container')[0].clientWidth;
    return Math.round(width * 0.38);
  }

  buildPosterStyle = (index) => {
    const hoverItem = this.state.hoverItem;
    let hoverStyle = {
      transform: 'translate3d(0px, 0px, 0px)',
      transitionDuration: '400ms',
      transitionTimingFunction: 'cubic-bezier(0.5, 0, 0.1, 1)',
      transitionDelay: '0ms'
    };

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

        hoverStyle.transform = transform;
        return hoverStyle;

      } else if (index === hoverItem) {
        let translateHalf;

        if (index === 0) {
          translateHalf = Math.floor((translateX / 2) + 5);
          transform = `scale(1.75) translate3d(${translateHalf}px, 0px, 0px)`;
          hoverStyle.transform = transform;
          return hoverStyle;

        } else if (index === slideLength - 1) {
          translateHalf = Math.floor((translateX / 2) + 8);
          transform = `scale(1.75) translate3d(-${translateHalf}px, 0px, 0px)`;
          hoverStyle.transform = transform;
          return hoverStyle;

        } else {
          hoverStyle.transform = 'scale(1.75) translate3d(0px, 0px, 0px)';
          return hoverStyle;
        }

      } else if (index > hoverItem) {
        if (hoverItem === slideLength - 1) {
          return {};

        } else if (hoverItem === 0) {
          transform = `translate3d(${translateX * 2}px, 0px, 0px)`;
          hoverStyle.transform = transform;
          return hoverStyle;

        } else {
          transform = `translate3d(${translateX}px, 0px, 0px)`;
          hoverStyle.transform = transform;
          return hoverStyle;
        }
      }

    } else {
      return hoverStyle;
    }
  }

  buildNextPosterStyle = (index) => {
    let hoverItem = this.state.hoverItem;
    let hoverStyle = {
      transform: 'translate3d(0px, 0px, 0px)',
      transitionDuration: '400ms',
      transitionTimingFunction: 'cubic-bezier(0.5, 0, 0.1, 1)',
      transitionDelay: '0ms'
    };

    if (hoverItem) {
      const slideLength = this.state.slideLength;
      const translateX = this.determineTranslateX();
      const begin = slideLength;
      const end = (slideLength * 2) + 1;
      const actualHover = hoverItem + begin;
      let transform;

      if (index >= begin && index <= end) {
        if (index < actualHover) {
          if (actualHover === end - 1) {
            transform = `translate3d(-${translateX * 2}px, 0px, 0px)`;

          } else if (actualHover === begin + 1) {
            return hoverStyle;

          } else {
            transform = `translate3d(-${translateX}px, 0px, 0px)`;
          }
  
          hoverStyle.transform = transform;
          return hoverStyle;
  
        } else if (index === actualHover) {
          let translateHalf;
  
          if (index === begin + 1) {
            translateHalf = Math.floor((translateX / 2) + 5);
            transform = `scale(1.75) translate3d(${translateHalf}px, 0px, 0px)`;
            hoverStyle.transform = transform;
            return hoverStyle;
  
          } else if (index === end - 1) {
            translateHalf = Math.floor((translateX / 2) + 8);
            transform = `scale(1.75) translate3d(-${translateHalf}px, 0px, 0px)`;
            hoverStyle.transform = transform;
            return hoverStyle;
  
          } else {
            hoverStyle.transform = 'scale(1.75) translate3d(0px, 0px, 0px)';
            return hoverStyle;
          }
  
        } else if (index > actualHover) {
          if (actualHover === begin + 1) {
            transform = `translate3d(${translateX * 2}px, 0px, 0px)`;
            hoverStyle.transform = transform;
            return hoverStyle;
          
          } else if (actualHover === end - 1) {
            return hoverStyle;
  
          } else {
            transform = `translate3d(${translateX}px, 0px, 0px)`;
            hoverStyle.transform = transform;
            return hoverStyle;
          }
        }

      } else {
        return hoverStyle;
      }

    } else {
      return hoverStyle;
    }

  }

  buildContainerStyle = (slideLength) => {
    // const slideLength = this.state.slideLength;
    const start = this.state.start;
    const next = this.state.next;
    const prev = this.state.prev;

    console.log('buildContainerStyle start: ' + start);

    // if (start === true) {
    //   return {
    //     transform: 'translate3d(0px, 0px, 0px)'
    //   }
    // } else {
    //   const translateX = this.transformations[slideLength];

    //   console.log('SC TRANSLATE X: ' + translateX);

    //   return {
    //     transform: `translate3d(${translateX}%, 0px, 0px)`
    //   }
    // }

    if (start) {
      if (next) {
        return {
          transform: `translate3d(-100%, 0px, 0px)`
        }
  
      } else if (prev) {
        return {
          transform: `translate3d(100%, 0px, 0px)`
        }

      } else {
        return {
          transform: ''
        }
      }

    } else {
      let translateX = this.transformations[slideLength];

      if (next) {
        translateX = translateX - 100;
        return {
          transform: `translate3d(${translateX}%, 0px, 0px)`
        }
  
      } else if (prev) {
        translateX = translateX + 100;
        return {
          transform: `translate3d(${translateX}%, 0px, 0px)`
        }

      } else {
        return {
          transform: `translate3d(${translateX}%, 0px, 0px)`
        }
      }
    }
  }

  componentDidUpdate() {
    console.log('SliderContent Updated');
    console.log(this.state);
  }
}
