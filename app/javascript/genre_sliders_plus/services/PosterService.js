// app/javascript/genre_sliders_plus/services/PosterService.js

export default class PosterService {
  constructor(props) {
    this.start = props.start;
    this.index = props.index;
    this.slideLength = props.slideLength;
    this.hoverItem = props.hoverItem;
    this.hoverStyle = {
      transform: 'translate3d(0px, 0px, 0px)',
      transitionDuration: '400ms',
      transitionTimingFunction: 'cubic-bezier(0.5, 0, 0.1, 1)',
      transitionDelay: '0ms'
    };
  }

  containerClass = () => {
    if (this.start) {
      if (this.index <= this.slideLength) {
        return `poster-container slide-item-${this.index}`;
      } else {
        return 'poster-container slider-item-';
      }

    } else {
      const begin = this.slideLength;
      const limit = (this.slideLength * 2) + 1;

      if (this.index >= begin && this.index <= limit) {
        const diff = (this.index - this.slideLength);
        return `poster-container slide-item-${diff}`;

      } else {
        return 'poster-container slider-item-';
      }
    }
  }

  posterStyle = () => {
    if (this.start) {
      return startPosterStyle();
    } else {
      return buildNextPosterStyle();
    }
  }

  startPosterStyle = () => {
    if (!this.hoverItem || this.hoverItem !== 0) return this.hoverStyle;

    const translateX = this.calcTranslateX();

    if (this.index < this.hoverItem) {
      this.hoverStyle.transform = this.determineTransform(translateX, this.hoverItem, this.slideLength);

    } else if (this.index === this.hoverItem) {
      if (this.index === 0) {
        const translateHalf = Math.floor((translateX / 2) + 5);
        this.hoverStyle.transform = this.translate3D(translateHalf, true);

      } else if (this.index === this.slideLength - 1) {
        const translateHalf = Math.floor((translateX / 2) + 8);
        this.hoverStyle.transform = this.translate3D(-translateHalf, true);

      } else {
        this.hoverStyle.transform = this.translate3D(0, true);
      }

    } else if (this.index > this.hoverItem) {
      if (this.hoverItem === this.slideLength - 1) {
        return {};

      } else if (this.hoverItem === 0) {
        this.hoverStyle.transform = this.translate3D(translateX * 2);

      } else {
        this.hoverStyle.transform = this.translate3D(translateX);
      }
    }

    return this.hoverStyle;
  }

  determineStartTransform = (tx) => {
    if (this.hoverItem === this.slideLength - 1) {
      // `translate3d(-${translateX * 2}px, 0px, 0px)`;
      return this.translate3D(-tx * 2);
    } else {
      // `translate3d(-${translateX}px, 0px, 0px)`;
      return this.translate3D(-tx);
    }
  }

  determineTransform = (tx, hover, end) => {
    // if (this.hoverItem === this.slideLength - 1) {
    if (hover === end - 1) {
      // `translate3d(-${translateX * 2}px, 0px, 0px)`;
      return this.translate3D(-tx * 2);
    } else {
      // `translate3d(-${translateX}px, 0px, 0px)`;
      return this.translate3D(-tx);
    }
  }

  nextPosterStyle = () => {
    if (!this.hoverItem) return this.hoverStyle;

    const begin = this.slideLength;
    const end = (this.slideLength * 2) + 1;

    if (!this.index >= begin && !this.index <= end) return this.hoverStyle;

    const translateX = calcTranslateX();
    const actualHover = this.hoverItem + begin;

    if (this.index < actualHover) {
      if (actualHover === begin + 1) return this.hoverStyle;

      if (actualHover === end - 1) {
        this.hoverStyle.transform = translate3D(-translateX * 2);
      } else {
        this.hoverStyle.transform = translate3D(-translateX);
      }

    } else if (this.index === actualHover) {
      if (this.index === begin + 1) {
        const translateHalf = Math.floor((translateX / 2) + 5);
        this.hoverStyle.transform = translate3D(translateHalf, true);

      } else if (this.index === end - 1) {
        const translateHalf = Math.floor((translateX / 2) + 8);
        hoverStyle.transform = translate3D(-translateHalf, true);

      } else {
        // hoverStyle.transform = 'scale(1.75) translate3d(0px, 0px, 0px)';
        this.hoverStyle.transform = translate3D(0, true);
      }

    } else if (this.index > actualHover) {
      if (actualHover === end - 1) return this.hoverStyle;

      if (actualHover === begin + 1) {
        this.hoverStyle.transform = translate3D(translateX * 2);

      } else {
        // transform = `translate3d(${translateX}px, 0px, 0px)`;
        this.hoverStyle.transform = translate3D(translateX);
      }
    }

    return this.hoverStyle;
  }

  calcTranslateX = () => {
    const width = document.getElementsByClassName('poster-container')[0].clientWidth;
    return Math.round(width * 0.38);
  }

  translate3D = (x, scale = false) => {
    if (scale) {
      return `scale(1.75) translate3d(${x}px, 0px, 0px)`;
    } else {
      return `translate3d(${x}px, 0px, 0px)`;
    }
  }
}


// ============================================================================


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
