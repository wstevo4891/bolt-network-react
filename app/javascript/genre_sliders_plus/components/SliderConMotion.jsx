// app/javascript/genre_sliders/components/SliderConMotion.jsx

import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';

// import SliderContent from './SliderContent';
// import Poster from './Poster';
import SlidesList from './SlidesList';
// import ContainerStyle from '../services/ContainerStyle';
import SliderMotion from '../services/SliderMotion';

class SliderConMotion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      slides: this.props.slides,
      slideLength: this.props.slideLength,
      start: this.props.start,
      next: this.props.next,
      prev: this.props.prev
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('SliderConMotion is receiving props');

    this.setState({
      slides: nextProps.slides,
      slideLength: nextProps.slideLength,
      start: nextProps.start,
      next: nextProps.next,
      prev: nextProps.prev
    });
  }

  render() {
    console.log('SliderConMotion is rendering!');

    const { slides, slideLength, start, next, prev } = this.state;

    const positioner = new SliderMotion(this.state);

    const motionStart = positioner.startPosition();
    const motionEnd = positioner.call();

    // if (frameHeight) {
    //   topHeight = stepCount * frameHeight;

    //   if (movement === 'next') {
    //     motionStart = (stepCount - 1) * frameHeight;

    //   } else if (movement === 'previous') {
    //     motionStart = (stepCount + 1) * frameHeight;
    //   }

    //   motionStart = motionStart > 0 ? -motionStart : motionStart;
    //   topHeight = topHeight > 0 ? -topHeight : topHeight;
    // }

    return (
      <Motion
        defaultStyle={{ x: motionStart }}
        style={{ x: spring(motionEnd) }}
      >
        {style => (
          <SlidesList
            style={{
              transform: `translate3d(${style.x}%, 0px, 0px)`
            }}
            slides={slides}
            slideLength={slideLength}
            start={start}
            next={next}
            prev={prev}
          />
        )}
      </Motion>
    );
  }

  componentDidUpdate() {
    console.log('SliderConMotion Updated');
    console.log(this.state);
  }
}

export default SliderConMotion;
