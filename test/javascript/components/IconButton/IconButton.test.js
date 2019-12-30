// IconButton Unit Test

import React from 'react'
import { mount, shallow } from 'enzyme'

import { IconButton } from '@components/IconButton'

describe('IconButton', () => {
  const mockClick = jest.fn()

  const mountedComponent = (button, icon, text) => mount(
    <IconButton
      buttonClass={button}
      handleClick={mockClick}
      icon={icon}
      text={text}
    />
  )

  const shallowComponent = (button, icon, text) => shallow(
    <IconButton
      buttonClass={button}
      handleClick={mockClick}
      icon={icon}
      text={text}
    />
  )

  let component

  it('should render correctly in "debug" mode', () => {
    component = shallowComponent('btn-clear', 'fa-plus', 'MY LIST')

    expect(component).toMatchSnapshot()
  })

  it('should render with default props', () => {
    component = mount(<IconButton handleClick={mockClick} icon="fa-plus" />)

    expect(component.prop('buttonClass')).toEqual('')
    expect(component.prop('text')).toEqual('')

    component.unmount()
  })

  it('should render expected icon prop', () => {
    component = mountedComponent('btn-clear', 'fa-plus', '')

    expect(
      component.find('button').find('i').hasClass('fa-plus')
    ).toEqual(true)

    component.unmount()
  })

  it('should render expected text prop', () => {
    component = mountedComponent('btn-clear', 'fa-plus', 'MY LIST')

    expect(
      component.find('button').text()
    ).toEqual('MY LIST')

    component.unmount()
  })

  // it('should render with expected prop types', () => {
  //   component = mountedComponent('btn-clear', 'fa-plus', 'MY LIST')

  //   expect(component.prop('buttonClass')).toBeString()
  // })

  it('should respond to click event', () => {
    component = shallowComponent('btn-clear', 'fa-plus', 'MY LIST')

    component.find('button').simulate('click')

    expect(mockClick.mock.calls.length).toEqual(1)
  })
})
