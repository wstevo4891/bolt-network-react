// app/javascript/main/scenes/Home/GenreSliders/components/SliderContent.jsx

import React, { Component } from 'react'

import Poster from '../../../components/Poster'
import ContainerStyle from '../services/ContainerStyle'
import SliderPosterService from '../services/SliderPosterService'

export default class SliderContainer extends Component {
  constructor(props) {
    super(props)

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
    this.setState({
      slides: nextProps.slides,
      slideLength: nextProps.slideLength,
      start: nextProps.start,
      next: nextProps.next,
      prev: nextProps.prev
    })
  }

  render() {
    const { slides, slideLength, start,
            next, prev, hoverItem } = this.state

    const slideOver = new ContainerStyle(this.state).call()

    const contClass = this.deterContClass(next, prev)

    return(
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
              mouseLeave={this.handleMouseLeave}
              service={SliderPosterService}
            />
          )
        }
      </div>
    )
  }

  handleMouseOver = (event) => {
    const target = event.target.closest('.poster-container')
    const slideIndex = parseInt(target.classList[1].slice(-1), 10)
    
    this.setState({
      hoverItem: slideIndex
    })
  }

  handleMouseLeave = () => {
    this.setState({
      hoverItem: null
    })
  }

  deterContClass = (next, prev) => {
    if (next || prev) {
      return "sliderContent animating"
    } else {
      return "sliderContent"
    }
  }
}