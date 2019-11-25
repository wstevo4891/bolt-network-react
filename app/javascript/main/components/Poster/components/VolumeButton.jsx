// app/javascript/main/scenes/components/VolumeButton.jsx

import React, { Component } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeUp, faVolumeMute  } from '@fortawesome/free-solid-svg-icons'

export default class VolumeButton extends Component {
  state = {
    volume: true
  }

  render() {
    const liked = this.props.liked
    const volume = this.state.volume

    return(
      <li className={this.buttonClass(liked)}>
        <button onClick={this.toggleVolume}>
          <FontAwesomeIcon icon={this.buttonIcon(volume)} />
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

  buttonIcon = (volume) => {
    if (volume) {
      return faVolumeUp
    } else {
      return faVolumeMute
    }
  }

  toggleVolume = () => {
    this.setState({
      volume: !this.state.volume
    })
  }
}
