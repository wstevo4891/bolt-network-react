/**
 * @object SessionListAPI
 * 
 * @description Access a list in sessionStorage.
 * Find, add, or remove objects in the list.
 */
export default {
  getList(listName) {
    const list = JSON.parse(sessionStorage.getItem(listName))

    return list === null ? {} : list
  },

  findMovie(movie, listName) {
    const list = this.getList(listName)

    return list[movie.id] ? true : false
  },

  add(movie, listName) {
    const list = this.getList(listName)

    list[movie.id] = movie

    sessionStorage.setItem(listName, JSON.stringify(list))

    console.log(`Movie was added to ${listName}`)
  },

  remove(movie, listName) {
    const list = this.getList(listName)

    delete list[movie.id]

    sessionStorage.setItem(listName, JSON.stringify(list))

    console.log(`Movie was removed from ${listName}`)
  },
}
