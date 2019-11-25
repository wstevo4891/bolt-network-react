// app/javascript/main/scenes/components/VolumeButton.jsx

import React, { Component } from 'react'

class VolumeButton extends Component {
  state = {
    volume: true
  }

  render() {
    const liked = this.props.liked
    const volume = this.state.volume

    return(
      <li className={this.buttonClass(liked)}>
        <button onClick={this.toggleVolume}>
          <i className={this.iconClass(volume)}></i>
        </button>
      </li>
    )
  }

  buttonClass = (liked) => {
    if (liked === null) {
      return 'poster-btn poster-btn-volume static'
    } else {
      return 'poster-btn poster-btn-volume move-down'
    }
  }

  iconClass = (volume) => {
    if (volume) {
      return 'fa fa-volume-up'
    } else {
      return 'fa fa-volume-mute'
    }
  }

  toggleVolume = () => {
    this.setState({
      volume: !this.state.volume
    })
  }
}

export default VolumeButton
