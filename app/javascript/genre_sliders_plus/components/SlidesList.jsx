// app/javascript/genre_sliders/components/SlidesList.jsx

import React, { Component } from 'react';

import Poster from './Poster';

class SlidesList extends Component {
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
    console.log('SlidesList is receiving props');

    this.setState({
      slides: nextProps.slides,
      slideLength: nextProps.slideLength,
      start: nextProps.start,
      next: nextProps.next,
      prev: nextProps.prev
    });
  }

  render() {
    console.log('SlidesList is rendering!');

    const { slides, slideLength, start, next, prev, hoverItem } = this.state;

    return (
      <div className="sliderContent" style={this.props.style}>
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
    console.log('SlidesList Updated');
    console.log(this.state);
  }
}

export default SlidesList;
