// Service for building translate3d container style
// for slides container

export default class SliderMotion {
  constructor(props) {
    this.slideLength = props.slideLength;
    this.start = props.start;
    this.next = props.next;
    this.prev = props.prev;
    this.transformations = {
      2: -150,
      3: -133.33333333333334,
      4: -125,
      5: -120,
      6: -116.66666666666667
    };
  }

  startPosition = () => {
    if (this.start) {
      return 0;
    } else {
      return this.transformations[this.slideLength];
    }
  }

  call = () => {
    console.log('start: ' + this.start);

    if (this.start) {
      return this.startStyle();
    } else {
      return this.transformStyle();
    }
  }

  startStyle = () => {
    if (this.next) {
      return -100;
    } else {
      return 0;
    }
  }

  transformStyle = () => {
    const translateX = this.transformations[this.slideLength];

    if (this.next) {
      return translateX - 100;

    } else if (this.prev) {
      return translateX + 100;

    } else {
      return translateX;
    }
  }

  // translate3D = (x) => {
  //   return { transform: `translate3d(${x}%, 0px, 0px)` };
  // }
}
