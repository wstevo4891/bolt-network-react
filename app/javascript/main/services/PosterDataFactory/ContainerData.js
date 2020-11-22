import translateFactory from './translateFactory'

const CONTAINER_CLASS = 'poster-container slide-item-'

export default class ContainerData {
  constructor(index, params) {
    this.slideItem = this.calcSlideItem(index, params)
    this.className = this.containerClassName(params.hoverItem)
    this.hoverStyle = this.buildHoverStyle(index, params)
  }

  calcSlideItem(index, params) {
    const { limit, slideLength, start, type } = params

    if (type === 'static') {
      return index
    } else if (start) {
      return this.startSlideItem(index, slideLength)
    } else {
      return this.afterStartSlideItem(index, limit, slideLength)
    }
  }

  startSlideItem(index, slideLength) {
    if (index <= slideLength) return index

    return ''
  }

  afterStartSlideItem(index, limit, slideLength) {
    if (index >= slideLength && index <= limit) {
      return index - slideLength
    }

    return ''
  }

  containerClassName(hoverItem) {
    if (this.slideItem === hoverItem) {
      return CONTAINER_CLASS + this.slideItem + ' mouseOver'
    } else {
      return CONTAINER_CLASS + this.slideItem
    }
  }

  buildHoverStyle(index, params) {
    if (params.hoverItem === null) return this.hoverStyleData()

    const translate = translateFactory(index, params)

    return this.hoverStyleData(translate)
  }

  hoverStyleData(translate = null) {
    return {
      transform: translate || 'translate3d(0px, 0px, 0px)',
      transitionDuration: '400ms',
      transitionTimingFunction: 'cubic-bezier(0.5, 0, 0.1, 1)',
      transitionDelay: '0ms',
    }
  }
}
