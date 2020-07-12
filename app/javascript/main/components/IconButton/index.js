// Icon Button Component

import React from 'react'
import PropTypes from 'prop-types'

import makeToggleable from '@helpers/makeToggleable'

import Icon from '../Icon'

function iconProps(props) {
  if (props.icon) {
    return Object.assign({}, props.iconProps, { icon: props.icon })
  }

  return props.iconProps
}

const IconButton = (props) => (
  <button
    id={props.id}
    className={props.buttonClass}
    aria-controls={props.ariaControls}
    aria-expanded={props.ariaExpanded}
    aria-label={props.ariaLabel}
    data-toggle={props.dataToggle}
    data-target={props.dataTarget}
    onClick={props.handleClick}
    type="button"
  >
    <Icon {...iconProps(props)} />{props.text}
  </button>
)

IconButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
  ariaControls: PropTypes.string,
  ariaExpanded: PropTypes.string,
  ariaLabel: PropTypes.string,
  buttonClass: PropTypes.string,
  dataToggle: PropTypes.string,
  dataTarget: PropTypes.string,
  icon: PropTypes.string,
  iconProps: PropTypes.shape(Icon.propTypes),
  id: PropTypes.string,
  text: PropTypes.string,
}

IconButton.defaultProps = {
  ariaControls: null,
  ariaExpanded: null,
  ariaLabel: null,
  buttonClass: null,
  dataToggle: null,
  dataTarget: null,
  icon: null,
  iconProps: null,
  id: null,
  text: null,
}

const ToggleIconButton = makeToggleable(IconButton)

export {
  IconButton,
  ToggleIconButton
}
