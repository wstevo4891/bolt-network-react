import React, { Component } from 'react'
import PropTypes from 'prop-types'

import SessionListInterface from '@services/SessionListInterface'

import { ToggleIconButton } from '../IconButton'

class ToggleListButton extends Component {
  constructor(props) {
    super(props)

    this.state = {
      inList: null
    }
  }

  render() {
    const inList = this.state.inList

    if (inList === null) return null

    return(
      <ToggleIconButton
        callback={this.toggleList}
        clickableProps={this.props.clickableProps}
        status={inList}
      />
    )
  }

  toggleList = () => {
    const { movie, listName } = this.props

    if (this.state.inList) {
      SessionListInterface.remove(movie, listName)
    } else {
      SessionListInterface.add(movie, listName)
    }

    this.setState(
      prevState => ({ inList: !prevState.inList }),
      this.props.updateContainer()
    )
  }

  componentDidMount() {
    const { movie, listName } = this.props

    const movieInList = SessionListInterface.findMovie(movie, listName)

    this.setState({ inList: movieInList })
  }
}

ToggleListButton.propTypes = {
  movie: PropTypes.object.isRequired,
  listName: PropTypes.string.isRequired,
  clickableProps: PropTypes.object.isRequired,
  updateContainer: PropTypes.func,
}

ToggleListButton.defaultProps = {
  updateContainer: () => void {},
}

export default ToggleListButton
