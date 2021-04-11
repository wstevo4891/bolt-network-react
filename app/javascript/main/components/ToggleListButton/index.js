import React, { Component } from 'react'
import PropTypes from 'prop-types'

import SessionListAPI from '@services/SessionListAPI'

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
        buttonProps={this.props.buttonProps}
        iconProps={this.props.iconProps}
        options={this.props.options}
        status={inList}
        text={this.props.text}
        textPlacement={this.props.textPlacement}
      />
    )
  }

  toggleList = () => {
    const { movie, listName } = this.props

    if (this.state.inList) {
      SessionListAPI.remove(movie, listName)
    } else {
      SessionListAPI.add(movie, listName)
    }

    this.setState(
      prevState => ({ inList: !prevState.inList }),
      this.props.updateContainer()
    )
  }

  componentDidMount() {
    const { movie, listName } = this.props

    const movieInList = SessionListAPI.findMovie(movie, listName)

    this.setState({ inList: movieInList })
  }
}

ToggleListButton.propTypes = {
  listName: PropTypes.string.isRequired,
  movie: PropTypes.object.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  buttonProps: PropTypes.object,
  iconProps: PropTypes.object,
  updateContainer: PropTypes.func,
}

ToggleListButton.defaultProps = {
  buttonProps: {},
  iconProps: {},
  updateContainer: () => void {},
}

export default ToggleListButton
