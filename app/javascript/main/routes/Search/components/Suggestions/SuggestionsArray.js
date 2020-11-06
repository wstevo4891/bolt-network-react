export default class SuggestionsArray {
  constructor(data) {
    this.genres = data.genres
    this.movies = data.movies
    this.people = data.people
    this.query = data.query
    return this.create()
  }

  create() {
    const genreLinks = this.buildSuggestions(this.genres, 'alias')
    const movieLinks = this.buildSuggestions(this.movies, 'title')
    const peopleLinks = this.buildSuggestions(this.people)

    return genreLinks.concat(peopleLinks).concat(movieLinks)
  }

  suggestionLink(id) {
    return `/search?q=${this.query}&suggestionId=${id}`
  }

  buildSuggestions(list, nameKey = 'name') {
    if (list.length === 0) return []

    return list.map(item => ({
      name: item[nameKey],
      link: this.suggestionLink(item.suggestionId)
    }))
  }
}
