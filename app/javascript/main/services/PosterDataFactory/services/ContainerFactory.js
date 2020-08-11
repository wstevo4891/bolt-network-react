// Poster Container Class Factory

const CONTAINER_CLASS = 'poster-container slide-item-'

const afterStartContainer = (index, limit, slideLength) => {
  if (index >= slideLength && index <= limit) {
    return CONTAINER_CLASS + (index - slideLength)
  }

  return CONTAINER_CLASS
}

const ContainerFactory = (index, { limit, slideLength, start, type }) => {
  if (type === 'static') return CONTAINER_CLASS + index

  if (start) {
    if (index <= slideLength) return CONTAINER_CLASS + index

    return CONTAINER_CLASS
  }

  return afterStartContainer(index, limit, slideLength)
}

export default ContainerFactory
