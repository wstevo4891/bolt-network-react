// app/javascript/slider/components/SimpleSlider.jsx

import React from 'react';
import Slider from 'react-slick';
import LeftNavButton from 'react-slick';
import RightNavButton from 'react-slick';
import { Slide } from './Slide';


export class SimpleSlider extends React.Component {
  render() {
    const settings = {
      dots: true,
      arrows: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    return (
      <div>
        {/* <LeftNavButton /> */}
        <Slider {...settings}>
          <div><img src='http://placekitten.com/g/400/200' /></div>
          <div><img src='http://placekitten.com/g/400/200' /></div>
          <div><img src='http://placekitten.com/g/400/200' /></div>
          <div><img src='http://placekitten.com/g/400/200' /></div>
        </Slider>
        {/* <RightNavButton /> */}
      </div>
    );
  }
}
