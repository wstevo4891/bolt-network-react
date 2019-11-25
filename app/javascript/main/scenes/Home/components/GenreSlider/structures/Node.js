// Doubly linked node for Doubly Linked List

export default class Node {
  constructor(data) {
    this.data = data
    this.previous = null
    this.next = null
  }

  last = () => {
    return this.data[this.data.length - 1]
  }
}