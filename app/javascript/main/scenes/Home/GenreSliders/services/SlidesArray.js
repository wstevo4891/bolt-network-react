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
    const head = this.list.head.data;
    const headNext = this.list.head.next.data;

    this.slides = this.slides.concat(head, headNext);

    this.slides.push(this.list.head.next.next.data[0]);
  }

  nextSlides = () => {
    if (this.position === 1) {
      this.slides.push(this.list.tail.previous.last());
      this.slides = this.slides.concat(this.list.tail.data);
      this.startSlides();

    } else if (this.position === this.list._length) {
      this.lastPositionSlides();
  
    } else {
      this.midPositionSlides();
    }
  }

  lastPositionSlides = () => {
    this.slides.push(this.list.tail.previous.previous.last());

    const tailPrev = this.list.tail.previous.data;
    const tail = this.list.tail.data;
    const head = this.list.head.data;

    this.slides = this.slides.concat(tailPrev, tail, head);

    this.slides.push(this.list.head.next.data[0]);
  }

  midPositionSlides = () => {
    const current = this.list.searchNodeAt(this.position);

    if (this.position === 2) {
      this.slides.push(this.list.tail.last());
    } else {
      this.slides.push(current.previous.previous.last());
    }

    const curPrev = current.previous.data;
    const cur = current.data;
    const curNext = current.next.data;

    this.slides = this.slides.concat(curPrev, cur, curNext);

    if (this.position === this.list._length - 1) {
      this.slides.push(this.list.head.data[0]);
    } else {
      this.slides.push(current.next.next.data[0]);
    }
  }
}
