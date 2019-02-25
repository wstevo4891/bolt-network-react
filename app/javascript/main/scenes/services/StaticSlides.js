// app/javascript/main/scenes/services/StaticSlides.js

export default class StaticSlides {
  constructor(items, limit) {
    this.items = items
    this.limit = limit
    this.slides = []
  }

  call = () => {
    if (this.items === null || this.items.length === 0) return []

    let counter = 0
    let itemCount = 0
    let arr = []

    for (let item of this.items) {
      itemCount++

      if (counter < this.limit && itemCount < this.items.length) {
        arr.push(item)
        counter++
      } else if (itemCount === this.items.length) {
        if (arr.length === this.limit) {
          this.slides.push(arr)
          this.slides.push([item])
        } else {
          arr.push(item)
          this.slides.push(arr)
        }
      } else {
        this.slides.push(arr)
        counter = 0
        arr = []
      }
    }

    return this.slides
  }
}
