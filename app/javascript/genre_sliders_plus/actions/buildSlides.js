// app/javascript/genre_sliders_plus/actions/buildSlides.js

export function buildSlides(props) {
  const list = props.moviesList;
  const position = props.position;
  let slides;

  if (props.start) {
    slides = list.head.data;
    slides = slides.concat(list.head.next.data);
    slides.push(list.head.next.next.data[0]);

  } else {
    slides = buildNextSlides(list, position);
  }

  return slides;
}

export function buildNextSlides(list, position) {
  let slides = [];

  if (position === 1) {
    slides.push(list.tail.previous.last());
    slides = slides.concat(list.tail.data);
    slides = slides.concat(list.head.data);
    slides = slides.concat(list.head.next.data);
    slides.push(list.head.next.next.data[0]);

  } else if (position === list._length) {
    slides.push(list.tail.previous.previous.last());
    slides = slides.concat(list.tail.previous.data);
    slides = slides.concat(list.tail.data);
    slides = slides.concat(list.head.data);
    slides.push(list.head.next.data[0]);

  } else {
    const current = list.searchNodeAt(position);
    if (position === 2) {
      slides.push(list.tail.last());
    } else {
      slides.push(current.previous.previous.last());
    }

    slides = slides.concat(current.previous.data);
    slides = slides.concat(current.data);
    slides = slides.concat(current.next.data);

    if (position === list._length - 1) {
      slides.push(list.head.data[0]);
    } else {
      slides.push(current.next.next.data[0]);
    }
  }

  return slides;
}

