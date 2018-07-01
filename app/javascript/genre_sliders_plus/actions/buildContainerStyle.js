// app/javascript/genre_sliders_plus/actions/buildContainerStyle.js

export function buildContainerStyle(props) {
  const slideLength = props.slideLength;
  const start = props.start;
  const next = props.next;
  const prev = props.prev;
  const transformations = {
    2: -150,
    3: -133.33333333333334,
    4: -125,
    5: -120,
    6: -116.66666666666667
  };

  console.log('buildContainerStyle start: ' + start);

  if (start) {
    if (next) {
      return {
        transform: `translate3d(-100%, 0px, 0px)`
      }

    } else {
      return {
        transform: ''
      }
    }

  } else {
    let translateX = transformations[slideLength];

    if (next) {
      translateX = translateX - 100;
      return {
        transform: `translate3d(${translateX}%, 0px, 0px)`
      }

    } else if (prev) {
      translateX = translateX + 100;
      return {
        transform: `translate3d(${translateX}%, 0px, 0px)`
      }

    } else {
      return {
        transform: `translate3d(${translateX}%, 0px, 0px)`
      }
    }
  }
}
