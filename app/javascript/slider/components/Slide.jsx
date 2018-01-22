// app/javascript/slider/components/Slide.jsx

import React from 'react';

export class Slide extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      image: props.image,
    };
  }

  render() {
    return(
      <div>
        <img src={this.state.image} />
      </div>
    );
  }
}
