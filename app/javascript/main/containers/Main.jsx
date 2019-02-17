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
      query: null,
      slideLength: null
    }

    this.slideLengthIndex = {
      1400: 6,
      1100: 5,
      800: 4,
      500: 3
    };

    this.breakpoints = [1400, 1100, 800, 500];
  }

  render() {
    return (
      <div id="main-container">
        <div id="navbar">
          <Navbar update={this.updateQuery} />
        </div>

        {this.determineRender()}
      </div>
    )
  }

  componentDidMount() {
    if (this.state.slideLength === null) {
      this.updateSlideLength();
    }

    window.addEventListener("resize", this.updateSlideLength.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateSlideLength.bind(this));
  }

  determineRender = () => {
    const { query, slideLength } = this.state

    if (query && query.length > 0) {
      const movies = this.searchMovies(query)

      return <SearchResults movies={movies} />
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

          <GenreSlidersContainer slideLength={slideLength} />

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
    axios.get(`/search/${query}`)
      .then(response => {
        console.log('Search Results: ' + JSON.stringify(response.data))

        return response.data
      })
      .catch(error => {
        console.error('Error in Main.searchMovies()')
        console.error(error);
      })
  }

  updateSlideLength = () => {
    let width = window.innerWidth;
    let num = null;

    for (let point of this.breakpoints) {
      if (width >= point) {
        num = this.slideLengthIndex[point];
        break;
      }
    }

    if (num == null) {
      num = 2;
    }

    console.log('slideLength: ' + num);

    this.setState({
      slideLength: num
    });
  }
}
