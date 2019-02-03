// app/javascript/navbar/components/SearchBarOld.jsx

import React, { Component } from 'react'

export default class SearchBarOld extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      placeHolder: 'Titles, people, genres',
      query: null
    }
  }

  render() {
    const { text, placeHolder, query } = this.state

    return(
      <form className="form-inline my-2 my-lg-0" action="/search">
        <input
          className="form-control mr-sm-2"
          type="search"
          name="query"
          placeholder={placeHolder}
          aria-label={placeHolder}
        />
        <button
          className="btn btn-outline-success my-2 my-sm-0"
          type="submit"
        >
          Search
        </button>
      </form>
    )
  }
}
