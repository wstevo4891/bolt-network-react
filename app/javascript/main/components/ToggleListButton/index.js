// MyListButton Container Class

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import SessionList from '@services/SessionList'

import { ToggleIconButton } from '../IconButton'

class ToggleListButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inList: null
    }
    this.list = new SessionList(props.movie, props.listName)
  }

  static propTypes = {
    movie: PropTypes.object.isRequired,
    listName: PropTypes.string.isRequired,
    updateContainer: PropTypes.func,
    buttonClass: PropTypes.string,
    text: PropTypes.string
  }

  static defaultProps = {
    updateContainer: () => true,
    buttonClass: '',
    text: ''
  }

  render() {
    const { iconOptions, buttonClass, text } = this.props
    const inList = this.state.inList

    if (inList === null) return null

    return(
      <ToggleIconButton
        status={inList}
        iconOptions={iconOptions}
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
    this.setState({
      inList: this.list.findMovie()
    })
  }
}

export default ToggleListButton
