// app/javascript/genre_sliders/components/SliderContent.jsx

import React, { Component } from 'react';
// import { CSSTransitionGroup } from 'react-transition-group';
import { Transition } from 'react-transition-group';

// import SliderContent from './SliderContent';
import Poster from './Poster';
import * as Styles from '../actions/buildContainerStyle';
import * as Events from '../actions/whichTransitionEvent';

class SliderContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      genre: this.props.genre,
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

    const slides = this.state.slides;

    if (slides && slides.length > 0) {
      const slideOver = Styles.buildContainerStyle(this.state);

      return (
        <Transition
          // in={this.state.next}
          timeout={1000}
          unmountOnExit={true}
          addEndListener={this.onAddEndListener}
        >
          <div className="sliderContent" style={slideOver}>
            {
              slides.map((slide, index) =>
                <Poster
                  key={index}
                  index={index}
                  movie={slide}
                  slideLength={this.state.slideLength}
                  start={this.state.start}
                  next={this.state.next}
                  prev={this.state.prev}
                  hoverItem={this.state.hoverItem}
                  mouseOver={this.handleMouseOver}
                  mouseOut={this.handleMouseOut}
                />
              )
            }
          </div>
        </Transition>
      );

    } else {
      return null;
    }
  }

  onAddEndListener = (node, done) => {
    // node.addEventListener('transitionend', done, false);

    done(this.props.transitionEnd);
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
}

export default SliderContainer;
