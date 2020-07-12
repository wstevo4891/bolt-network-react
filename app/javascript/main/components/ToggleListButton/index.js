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
    const { options, iconProps, buttonClass, text } = this.props
    const inList = this.state.inList

    if (inList === null) return null

    return(
      <ToggleIconButton
        status={inList}
        options={options}
        iconProps={iconProps}
        buttonClass={buttonClass}
        text={text}
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
  iconProps: PropTypes.shape({
    id: PropTypes.string,
    ariaHidden: PropTypes.string,
  }),
  listName: PropTypes.string.isRequired,
  updateContainer: PropTypes.func,
  buttonClass: PropTypes.string,
  text: PropTypes.string
}

ToggleListButton.defaultProps = {
  buttonClass: null,
  iconProps: {},
  text: null,
  updateContainer: () => void {},
}

export default ToggleListButton
