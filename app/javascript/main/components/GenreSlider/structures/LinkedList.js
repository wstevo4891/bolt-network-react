// Doubly Linked List

import Node from './Node';

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

  remove = (position) => {
    let currentNode = this.head

    // 1st use-case: an invalid position
    this.checkPosition()

    // 2nd use-case: the first node is removed
    if (position === 1) {
      this.removeFirstNode(currentNode)

    // 3rd use-case: the last node is removed
    } else if (position === this._length) {
      this.tail = this.tail.previous
      this.tail.next = null

    // 4th use-case: a middle node is removed
    } else {
      this.removeMiddleNode(currentNode, position)
    }

    this._length--

    return 'Node was successfully removed.'
  }

  removeFirstNode = (currentNode) => {
    this.head = currentNode.next

    // there is a second node
    if (!this.head) {
      this.head.previous = null

    // there is no second node
    } else {
      this.tail = null
    }
  }

  removeMiddleNode = (currentNode, position) => {
    let count = 1

    while (count < position) {
      currentNode = currentNode.next
      count++
    }

    const beforeNodeToDelete = currentNode.previous
    const afterNodeToDelete = currentNode.next

    beforeNodeToDelete.next = afterNodeToDelete
    afterNodeToDelete.previous = beforeNodeToDelete
    currentNode = null
  }
}
