import React, { Component } from 'react'
import PropTypes from 'prop-types'

import SessionList from '@services/SessionList'

import { ToggleIconButton } from '../IconButton'

class ToggleListButton extends Component {
  constructor(props) {
    super(props)
    this.list = new SessionList(props.movie, props.listName)

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
    this.state.inList ? this.list.remove() : this.list.add()

    this.setState(
      prevState => ({ inList: !prevState.inList }),
      this.props.updateContainer()
    )
  }

  componentDidMount() {
    const movieInList = this.list.findMovie()

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
