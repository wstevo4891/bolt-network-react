// app/javascript/genre_sliders_plus/actions/whichTransitionEvent.js

// document.querySelector('#click').addEventListener('click', function(e){
//   if(e.currentTarget.dataset.triggered) return;
//   e.currentTarget.dataset.triggered = true;
//   alert('clicked');
// })
// <button id="click">Click me</button>

export function whichTransitionEvent(element) {
  const transitions = {
    transition: "transitionend",
    OTransition: "oTransitionEnd",
    MozTransition: "transitionend",
    WebkitTransition: "webkitTransitionEnd"
  }

  const keys = Object.keys(transitions);

  for (let t of keys) {
    if (element.style[t] !== undefined) {
      return transitions[t];
    }
  }
}

export function findSliderContent(genre) {
  return document.getElementById(`${genre.name}_slider`).children[0].children[0];
}

export function findNextSliderContent(genre) {
  return document.getElementById(`${genre.name}_slider`).children[1].children[0];
}
