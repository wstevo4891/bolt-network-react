// app/javascript/movies/components/Slider.jsx
import React from 'react';
import { Slider } from 'react-slick';

export class GenreSlider extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      genre: this.props.genres,
      moviesObject: this.props.moviesObject
    };

    this.buildMoviesObject = this.buildMoviesObject.bind(this);
  }

  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4
    };

    return (
      <Slider {...settings}>
        {
          settings.slidesToShow.map((slide) =>
            <Slide key={slide}></Slide>
          )
        }
      </Slider>
    );
  }
}
