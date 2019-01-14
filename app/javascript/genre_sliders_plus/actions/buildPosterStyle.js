// app/javascript/genre_sliders_plus/actions/buildPosterStyle.js

// export function buildPosterStyle(props) {
//   const hoverItem = props.hoverItem;
//   const index = props.index;
//   let hoverStyle = {
//     transform: 'translate3d(0px, 0px, 0px)',
//     transitionDuration: '400ms',
//     transitionTimingFunction: 'cubic-bezier(0.5, 0, 0.1, 1)',
//     transitionDelay: '0ms'
//   };

//   if (hoverItem || hoverItem === 0) {
//     const slideLength = props.slideLength;
//     const translateX = determineTranslateX();
//     let transform;

//     if (index < hoverItem) {
//       if (hoverItem === slideLength - 1) {
//         transform = `translate3d(-${translateX * 2}px, 0px, 0px)`;
//       } else {
//         transform = `translate3d(-${translateX}px, 0px, 0px)`;
//       }

//       hoverStyle.transform = transform;
//       return hoverStyle;

//     } else if (index === hoverItem) {
//       let translateHalf;

//       if (index === 0) {
//         translateHalf = Math.floor((translateX / 2) + 5);
//         transform = `scale(1.75) translate3d(${translateHalf}px, 0px, 0px)`;
//         hoverStyle.transform = transform;
//         return hoverStyle;

//       } else if (index === slideLength - 1) {
//         translateHalf = Math.floor((translateX / 2) + 8);
//         transform = `scale(1.75) translate3d(-${translateHalf}px, 0px, 0px)`;
//         hoverStyle.transform = transform;
//         return hoverStyle;

//       } else {
//         hoverStyle.transform = 'scale(1.75) translate3d(0px, 0px, 0px)';
//         return hoverStyle;
//       }

//     } else if (index > hoverItem) {
//       if (hoverItem === slideLength - 1) {
//         return {};

//       } else if (hoverItem === 0) {
//         transform = `translate3d(${translateX * 2}px, 0px, 0px)`;
//         hoverStyle.transform = transform;
//         return hoverStyle;

//       } else {
//         transform = `translate3d(${translateX}px, 0px, 0px)`;
//         hoverStyle.transform = transform;
//         return hoverStyle;
//       }
//     }

//   } else {
//     return hoverStyle;
//   }
// }

// export function buildNextPosterStyle(props) {
//   const hoverItem = props.hoverItem;
//   const index = props.index;

//   let hoverStyle = {
//     transform: 'translate3d(0px, 0px, 0px)',
//     transitionDuration: '400ms',
//     transitionTimingFunction: 'cubic-bezier(0.5, 0, 0.1, 1)',
//     transitionDelay: '0ms'
//   };

//   if (hoverItem) {
//     const slideLength = props.slideLength;
//     const translateX = determineTranslateX();
//     const begin = slideLength;
//     const end = (slideLength * 2) + 1;
//     const actualHover = hoverItem + begin;
//     let transform;

//     if (index >= begin && index <= end) {
//       if (index < actualHover) {
//         if (actualHover === end - 1) {
//           transform = `translate3d(-${translateX * 2}px, 0px, 0px)`;

//         } else if (actualHover === begin + 1) {
//           return hoverStyle;

//         } else {
//           transform = `translate3d(-${translateX}px, 0px, 0px)`;
//         }

//         hoverStyle.transform = transform;
//         return hoverStyle;

//       } else if (index === actualHover) {
//         let translateHalf;

//         if (index === begin + 1) {
//           translateHalf = Math.floor((translateX / 2) + 5);
//           transform = `scale(1.75) translate3d(${translateHalf}px, 0px, 0px)`;
//           hoverStyle.transform = transform;
//           return hoverStyle;

//         } else if (index === end - 1) {
//           translateHalf = Math.floor((translateX / 2) + 8);
//           transform = `scale(1.75) translate3d(-${translateHalf}px, 0px, 0px)`;
//           hoverStyle.transform = transform;
//           return hoverStyle;

//         } else {
//           hoverStyle.transform = 'scale(1.75) translate3d(0px, 0px, 0px)';
//           return hoverStyle;
//         }

//       } else if (index > actualHover) {
//         if (actualHover === begin + 1) {
//           transform = `translate3d(${translateX * 2}px, 0px, 0px)`;
//           hoverStyle.transform = transform;
//           return hoverStyle;
        
//         } else if (actualHover === end - 1) {
//           return hoverStyle;

//         } else {
//           transform = `translate3d(${translateX}px, 0px, 0px)`;
//           hoverStyle.transform = transform;
//           return hoverStyle;
//         }
//       }

//     } else {
//       return hoverStyle;
//     }

//   } else {
//     return hoverStyle;
//   }
// }

// export function determineTranslateX() {
//   const width = document.getElementsByClassName('poster-container')[0].clientWidth;
//   return Math.round(width * 0.38);
// }

// export function buildContainerClass(props) {
//   const slideLength = props.slideLength;
//   const index = props.index;

//   if (props.start) {
//     if (index <= slideLength) {
//       return `poster-container slide-item-${props.index}`;
//     } else {
//       return 'poster-container slider-item-';
//     }

//   } else {
//     const begin = slideLength;
//     const limit = (slideLength * 2) + 1;

//     if (index >= begin && index <= limit) {
//       const diff = (index - slideLength);
//       return `poster-container slide-item-${diff}`;

//     } else {
//       return 'poster-container slider-item-';
//     }
//   }
// }
