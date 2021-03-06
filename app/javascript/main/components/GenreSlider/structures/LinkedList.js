// Doubly Linked List

const Node = (data) => ({
  data,
  next: null,
  prev: null,
  get last() {
    return this.data[this.data.length - 1]
  },
})

export default class LinkedList {
  constructor() {
    this._length = 0
    this.head = null
    this.tail = null
  }

  add(value) {
    const node = Node(value)

    if (this._length > 0) {
      node.prev = this.tail
      this.tail.next = node
      this.tail = node
    } else {
      this.head = node
      this.tail = node
    }

    this._length++

    return node
  }

  checkPosition(position) {
    if (this._length === 0 || position < 1 || position > this._length) {
      throw new Error('Failure: non-existent node in this list.')
    }
  }

  searchNodeAt(position) {
    // 1st use-case: an invalid position
    this.checkPosition();

    let currentNode = this.head
    let count = 1

    // 2nd use-case: a valid position
    while (count < position) {
      currentNode = currentNode.next || this.head
      count++
    }

    return currentNode
  }

  calcPosition(next, prev, position) {
    if (next) {
      return this.nextPosition(position)
    } else if (prev) {
      return this.prevPosition(position)
    }
  }

  nextPosition(position) {
    if (position === this._length) return 1

    return position + 1
  }

  prevPosition(position) {
    if (position === 1) return this._length

    return position - 1
  }
}
