// Doubly linked node for Doubly Linked List

const Node = class {
  constructor(data) {
    this.data = data;
    this.previous = null;
    this.next = null;
  }

  last = () => {
    const length = this.data.length;
    return this.data[length - 1];
  }
}

export default Node;
