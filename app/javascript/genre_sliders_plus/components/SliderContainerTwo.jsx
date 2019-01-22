// app/javascript/genre_sliders/components/SliderContent.jsx

import React, { Component } from 'react';
// import { Motion, spring } from 'react-motion';

// import SliderContent from './SliderContent';
import Poster from './Poster';
import ContainerStyle from '../services/ContainerStyle';

class SliderContainerTwo extends Component {
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
  }

  componentWillReceiveProps(nextProps) {
    console.log('SliderContainer is receiving props');

    this.setState({
      slides: nextProps.slides,
      slideLength: nextProps.slideLength,
      start: nextProps.start,
      next: nextProps.next,
      prev: nextProps.prev
    });
  }

  render() {
    console.log('SliderContainer is rendering!');

    const { slides, slideLength, start, next, prev, hoverItem } = this.state;

    const slideOver = new ContainerStyle(this.state).call();

    const contClass = this.deterContClass(start, next, prev);

    return (
      <div className={contClass} style={slideOver}>
        {
          slides.map((slide, index) =>
            <Poster
              key={index}
              index={index}
              movie={slide}
              slideLength={slideLength}
              start={start}
              next={next}
              prev={prev}
              hoverItem={hoverItem}
              mouseOver={this.handleMouseOver}
              mouseOut={this.handleMouseOut}
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

  componentDidUpdate() {
    console.log('SliderContainer Updated');
    console.log(this.state);
  }

  deterContClass = (start, next, prev) => {
    if (next || prev) {
      return "sliderContent animating";
    } else {
      return "sliderContent";
    }
  }
}

export default SliderContainerTwo;
