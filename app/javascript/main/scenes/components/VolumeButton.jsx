// app/javascript/main/scenes/components/VolumeButton.jsx

import React, { Component } from 'react'

export default class VolumeButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      liked: this.props.liked,
      volume: true
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      liked: nextProps.liked
    })
  }

  render() {
    const { liked, volume } = this.state
    const iconClass = this.deterIconClass(volume)

    return(
      <li className="poster-btn poster-btn-volume">
        <button onClick={() => this.toggleVolume(volume)}>
          <i className={iconClass}></i>
        </button>
      </li>
    )
  }

  deterItemClass = (liked) => {
    if (liked === null) {
      return 'static'
    } else {
      return 'move-down'
    }
  }

  deterIconClass = (volume) => {
    if (volume) {
      return 'fa fa-volume-up'
    } else {
      return 'fa fa-times'
    }
  }

  toggleVolume = (volume) => {
    if (volume) {
      this.setState({
        volume: false
      })
    } else {
      this.setState({
        volume: true
      })
    }
  }
}

