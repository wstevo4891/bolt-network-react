// Higher Order Component: makeToggleable

import React from 'react'
import PropTypes from 'prop-types'

function makeToggleable(Clickable) {
  class Proxy extends React.Component {
    constructor(props) {
      super(props)
      this.options = props.options

      this.state = {
        status: props.status,
        icon: this.setIcon(props.status)
      }

      this.toggle = this.toggle.bind(this)
    }

    render() {
      const { buttonClass, text } = this.props

      return(
        <Clickable
          buttonClass={buttonClass}
          handleClick={this.toggle}
          iconProps={this.buildIconProps()}
          text={text}
        />
      )
    }

    setIcon(status) {
      return status ? this.options[1] : this.options[0]
    }

    buildIconProps() {
      const { iconProps } = this.props
      const { icon } = this.state

      return Object.assign({}, iconProps, { icon })
    }

    toggle() {
      const newStatus = !this.state.status
      const newIcon = this.setIcon(newStatus)

      this.setState({
        status: newStatus,
        icon: newIcon,
      })

      this.props.updateStatus()
    }
  }

  Proxy.propTypes = {
    options: PropTypes.array.isRequired,
    status: PropTypes.bool.isRequired,
    iconProps: PropTypes.shape({
      id: PropTypes.string,
      ariaHidden: PropTypes.string,
    }),
    buttonClass: PropTypes.string,
    text: PropTypes.string,
    updateStatus: PropTypes.func
  }

  Proxy.defaultProps = {
    buttonClass: null,
    iconProps: {},
    text: null,
    updateStatus: () => void {},
  }

  return Proxy
}

export default makeToggleable
