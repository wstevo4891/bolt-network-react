// Doubly Linked List

import Node from './Node'

export default class LinkedList {
  constructor() {
    this._length = 0
    this.head = null
    this.tail = null
  }

  add = (value) => {
    const node = new Node(value)

    if (this._length > 0) {
      node.previous = this.tail
      this.tail.next = node
      this.tail = node
    } else {
      this.head = node
      this.tail = node
    }

    this._length++

    return node
  }

  checkPosition = (position) => {
    if (this._length === 0 || position < 1 || position > this._length) {
      throw new Error('Failure: non-existent node in this list.')
    }
  }

  searchNodeAt = (position) => {
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
}
