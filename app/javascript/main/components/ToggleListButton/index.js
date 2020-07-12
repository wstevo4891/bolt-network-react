// MyListButton Container Class

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
    const { options, clickableProps } = this.props
    const inList = this.state.inList

    if (inList === null) return null

    return(
      <ToggleIconButton
        clickableProps={clickableProps}
        status={inList}
        options={options}
        optionKey="icon"
        updateStatus={this.toggleList}
      />
    )
  }

  toggleList = () => {
    const inList = this.state.inList

    inList ? this.list.remove() : this.list.add()

    this.setState({ inList: !inList })

    this.props.updateContainer()
  }

  componentDidMount() {
    const movieInList = this.list.findMovie()

    this.setState({
      inList: movieInList
    })
  }
}

ToggleListButton.propTypes = {
  movie: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
  listName: PropTypes.string.isRequired,
  clickableProps: PropTypes.shape({
    buttonClass: PropTypes.string,
    text: PropTypes.string,
  }),
  updateContainer: PropTypes.func,
}

ToggleListButton.defaultProps = {
  clickableProps: {
    buttonClass: null,
    text: null,
  },
  updateContainer: () => void {},
}

export default ToggleListButton
