// app/javascript/main/components/Main.jsx

import React, { Component } from 'react'

import API from '../services/API'
import Navbar from './Navbar/containers/Navbar'
import Routes from './Routes'

export default class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      slideLength: this.props.slideLength,
      genres: null
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.slideLength === this.state.slideLength) return

    this.setState({
      slideLength: nextProps.slideLength
    })
  }

  render() {
    const { slideLength, genres } = this.state

    if (genres === null) return null

    return (
      <div id="main-container">
        <Navbar genres={genres} />

        <Routes slideLength={slideLength} genres={genres} />
      </div>
    )
  }

  componentDidMount() {
    const genresData = localStorage.getItem('Genres')

    if (genresData) {
      this.setState({
        genres: JSON.parse(genresData)
      })
    } else {
      this.fetchGenres()
    }
  }

  fetchGenres() {
    API.genres.index()
      .then(response => {
        localStorage.setItem('Genres', JSON.stringify(response.data));

        this.setState({
          genres: response.data
        });
      })
      .catch(error => {
        console.error(error);
      })
  }
}
