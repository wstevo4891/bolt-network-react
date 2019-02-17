// app/javascript/main/containers/Main.jsx

import React, { Component } from 'react'
import axios from 'axios'

import Navbar from '../../navbar/containers/Navbar'
import SearchResults from '../components/SearchResults'
import Carousel from '../../carousel/containers/Carousel'
import GenreSlidersContainer from '../../genre_sliders/components/GenreSlidersContainer'

export default class Main extends Component {
  constructor() {
    super()
    this.state = {
      query: null
    }
  }

  render() {
    return (
      <div id="main-container">
        <Navbar update={this.updateQuery} />

        {this.determineRender()}
      </div>
    )
  }

  determineRender = () => {
    const query = this.state.query

    if (query) {
      return <SearchResults />
    } else {
      return(
        <main className="application">
          <Carousel />

          <div className="container">
            <div className="row justify-content-center">
              <div className="supporting">
                <h2>A world of movies at your fingertips.</h2>
                <p>Choose from the latest titles, with new movies added every day.</p>
              </div>
            </div>
          </div>

          <GenreSlidersContainer />

          <div className="feature">
            <div className="container">
              <h1>Available everywhere</h1>
              <p>Start watching on one device, and pick up where you left off on another device.</p>
            </div>
          </div>
        </main>
      )
    }
  }

  updateQuery = (query) => {
    this.setState({
      query: query
    })
  }

  searchMovies = (query) => {

  }
}
