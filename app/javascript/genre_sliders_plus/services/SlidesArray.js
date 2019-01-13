// app/javascript/genre_sliders_plus/services/SlidesArray.js

export default class SlidesArray {
  constructor(props) {
    this.start = props.start;
    this.list = props.moviesList;
    this.position = props.position;
    this.slides = [];
  }

  call = () => {
    if (this.start) {
      this.startSlides();
    } else {
      this.nextSlides();
    }

    return this.slides;
  }

  startSlides = () => {
    this.slides.concat(this.list.head.data);
    this.slides.concat(this.list.head.next.data);
    this.slides.push(this.list.head.next.next.data[0]);
  }

  nextSlides = () => {
    if (this.position === 1) {
      this.slides.push(this.list.tail.previous.last());
      this.slides.concat(this.list.tail.data);
      this.startSlides();

    } else if (this.position === this.list._length) {
      this.lastPositionSlides();
  
    } else {
      this.midPositionSlides();
    }
  }

  lastPositionSlides = () => {
    this.slides.push(this.list.tail.previous.previous.last());
    this.slides.concat(this.list.tail.previous.data);
    this.slides.concat(this.list.tail.data);
    this.slides.concat(this.list.head.data);
    this.slides.push(this.list.head.next.data[0]);
  }

  midPositionSlides = () => {
    const current = this.list.searchNodeAt(this.position);

    if (this.position === 2) {
      this.slides.push(list.tail.last());
    } else {
      this.slides.push(current.previous.previous.last());
    }

    this.slides.concat(current.previous.data);
    this.slides.concat(current.data);
    this.slides.concat(current.next.data);

    if (this.position === this.list._length - 1) {
      this.slides.push(this.list.head.data[0]);
    } else {
      this.slides.push(current.next.next.data[0]);
    }
  }
}
