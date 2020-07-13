// Higher Order Component: makeToggleable

import React from 'react'
import PropTypes from 'prop-types'

function makeToggleable(Clickable) {
  class Proxy extends React.Component {
    constructor(props) {
      super(props)
      this.options = props.options

      this.state = {
        status: props.status
      }

      this.toggle = this.toggle.bind(this)
    }

    render() {
      const clickableProps = this.buildClickableProps()

      return(
        <Clickable
          handleClick={this.toggle}
          {...clickableProps}
        />
      )
    }

    buildClickableProps() {
      const { clickableProps, optionKey } = this.props
      const option = this.state.status ? this.options[1] : this.options[0]

      return Object.assign({}, clickableProps, { [optionKey]: option })
    }

    toggle() {
      const newStatus = !this.state.status

      this.setState({
        status: newStatus,
      })

      this.props.updateStatus()
    }
  }

  Proxy.propTypes = {
    options: PropTypes.array.isRequired,
    status: PropTypes.bool.isRequired,
    optionKey: PropTypes.string.isRequired,
    clickableProps: PropTypes.object,
    updateStatus: PropTypes.func
  }

  Proxy.defaultProps = {
    clickableProps: {},
    updateStatus: () => void {},
  }

  return Proxy
}

export default makeToggleable
