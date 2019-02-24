// app/javascript/main/scenes/services/StaticPosterService.js

export default class StaticPosterService {
  constructor(props) {
    this.index = props.index;
    this.slideLength = props.slideLength;
    this.end = props.slideLength - 1;
    this.hoverItem = props.hoverItem;
    this.hoverStyle = {
      transform: 'translate3d(0px, 0px, 0px)',
      transitionDuration: '400ms',
      transitionTimingFunction: 'cubic-bezier(0.5, 0, 0.1, 1)',
      transitionDelay: '0ms'
    };
  }

  containerClass = () => {
    return `poster-container slide-item-${this.index}`
  }

  posterStyle = () => {
    if (this.hoverItem === null) return this.hoverStyle;

    this.translateX = this.calcTranslateX();

    return this.buildPosterStyle();
  }

  calcTranslateX = () => {
    const width = document.getElementsByClassName('poster-container')[0].clientWidth;
    return Math.round(width * 0.38);
  }

  buildPosterStyle = () => {
    if (this.index < this.hoverItem) {  
      this.hoverStyle.transform = this.negativeTranslate()
  
    } else if (this.index === this.hoverItem) {
      this.currentPositionStyle();
  
    } else if (this.index > this.hoverItem) {  
      this.afterHoverStyle();
    }
  
    return this.hoverStyle;
  }
  
  currentPositionStyle = () => {
    if (this.index === 0) {
      const translateHalf = Math.floor((this.translateX / 2) + 5);
      this.hoverStyle.transform = this.translate3D(translateHalf, true);
  
    } else if (this.index === this.end) {
      const translateHalf = Math.floor((this.translateX / 2) + 8);
      this.hoverStyle.transform = this.translate3D(-translateHalf, true);
  
    } else {
      this.hoverStyle.transform = this.translate3D(0, true);
    }
  }
  
  afterHoverStyle = () => {
    if (this.hoverItem === 0 || this.hoverItem === this.end) {
      this.hoverStyle.transform = this.translate3D(this.translateX * 2);
  
    } else {
      this.hoverStyle.transform = this.translate3D(this.translateX);
    }
  }

  negativeTranslate = () => {
    if (this.hoverItem === this.end) {
      return this.translate3D(-this.translateX * 2);
    } else {
      return this.translate3D(-this.translateX);
    }
  }

  translate3D = (x, scale = false) => {
    if (scale) {
      return `scale(1.75) translate3d(${x}px, 0px, 0px)`;
    } else {
      return `translate3d(${x}px, 0px, 0px)`;
    }
  }
}
