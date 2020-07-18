// Higher Order Component: makeToggleable

import React from 'react'
import PropTypes from 'prop-types'

function makeToggleable(Clickable) {
  class Proxy extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        status: props.status,
      }

      this.toggleStatus = this.toggleStatus.bind(this)
    }

    render() {
      return(
        <Clickable
          handleClick={this.toggleStatus}
          status={this.state.status}
          {...this.props.clickableProps}
        />
      )
    }

    toggleStatus() {
      this.setState(
        prevState => ({ status: !prevState.status }),
        this.props.callback()
      )
    }
  }

  Proxy.propTypes = {
    clickableProps: PropTypes.object,
    callback: PropTypes.func,
    status: PropTypes.bool,
  }

  Proxy.defaultProps = {
    clickableProps: {},
    callback: () => void {},
    status: true,
  }

  return Proxy
}

export default makeToggleable
