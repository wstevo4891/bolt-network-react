// Higher Order Component: makeToggleable

import React from 'react'
import PropTypes from 'prop-types'

function makeToggleable(Clickable) {
  return class Proxy extends React.Component {
    constructor(props) {
      super(props)
      this.iconOptions = props.iconOptions
      this.toggle = this.toggle.bind(this)
      this.state = {
        status: this.props.status
      }
    }

    static propTypes = {
      iconOptions: PropTypes.array.isRequired,
      status: PropTypes.bool.isRequired,
      buttonClass: PropTypes.string,
      text: PropTypes.string,
      updateStatus: PropTypes.func
    }

    static defaultProps = {
      buttonClass: '',
      text: '',
      updateStatus: () => true
    }

    render() {
      const { buttonClass, text } = this.props
      const icon = this.setIcon()

      return(
        <Clickable
          buttonClass={buttonClass}
          handleClick={this.toggle}
          icon={icon}
          text={text}
        />
      )
    }

    setIcon() {
      return this.state.status ? this.iconOptions[1] : this.iconOptions[0]
    }

    toggle() {
      this.setState({
        status: !this.state.status
      })

      this.props.updateStatus()
    }
  }
}

export default makeToggleable
