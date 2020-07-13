// Icon Button Component

import React from 'react'
import PropTypes from 'prop-types'

import makeToggleable from '@helpers/makeToggleable'

import Icon from '../Icon'

function buildIconProps(icon, iconProps) {
  if (icon) {
    return Object.assign({}, iconProps, { icon: icon })
  }

  return iconProps
}

function buttonContent(icon, iconProps, text, textPlacement) {
  const propsForIcon = buildIconProps(icon, iconProps)

  if (textPlacement === "right") {
    return <><Icon {...propsForIcon} />{text}</>
  }

  return <>{text}<Icon {...propsForIcon} /></>
}

const IconButton = (props) => (
  <button
    id={props.id}
    className={props.buttonClass}
    aria-controls={props.ariaControls}
    aria-expanded={props.ariaExpanded}
    aria-haspopup={props.ariaHasPopup}
    aria-label={props.ariaLabel}
    data-toggle={props.dataToggle}
    data-target={props.dataTarget}
    onClick={props.handleClick}
    type="button"
  >
    {buttonContent(props.icon, props.iconProps, props.text, props.textPlacement)}
  </button>
)

IconButton.propTypes = {
  ariaControls: PropTypes.string,
  ariaExpanded: PropTypes.string,
  ariaHasPopup: PropTypes.string,
  ariaLabel: PropTypes.string,
  buttonClass: PropTypes.string,
  dataToggle: PropTypes.string,
  dataTarget: PropTypes.string,
  handleClick: PropTypes.func,
  icon: PropTypes.string,
  iconProps: PropTypes.shape(Icon.propTypes),
  id: PropTypes.string,
  text: PropTypes.string,
  textPlacement: PropTypes.string,
}

IconButton.defaultProps = {
  ariaControls: null,
  ariaExpanded: null,
  ariaHasPopup: null,
  ariaLabel: null,
  buttonClass: null,
  dataToggle: null,
  dataTarget: null,
  handleClick: () => void {},
  icon: null,
  iconProps: null,
  id: null,
  text: null,
  textPlacement: "right"
}

const ToggleIconButton = makeToggleable(IconButton)

export {
  IconButton,
  ToggleIconButton
}
