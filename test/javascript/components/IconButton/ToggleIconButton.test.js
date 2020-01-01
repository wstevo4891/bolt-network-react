import React from 'react'
import { mount, shallow } from 'enzyme'

import { ToggleIconButton } from '@components/IconButton'

const shallowComponent = () => shallow(
  <ToggleIconButton
    status={true}
    iconOptions={['fa-volume-off', 'fa-volume-up']}
  />
)

const mountedComponent = () => mount(
  <ToggleIconButton
    status={true}
    iconOptions={['fa-volume-off', 'fa-volume-up']}
  />
)

describe('ToggleIconButton', () => {
  let component

  it('should render correctly in "debug" mode', () => {
    component = shallowComponent()

    expect(component).toMatchSnapshot()
  })

  describe('ToggleIconButton props', () => {
    beforeEach(() => {
      component = mountedComponent()
    })

    afterEach(() => component.unmount())

    it('should render with default props', () => {
      expect(component.prop('buttonClass')).toEqual('')
      expect(component.prop('text')).toEqual('')
      expect(component.prop('updateStatus')()).toEqual(true)
    })

    it('should render with expected status prop', () => {
      expect(component.prop('status')).toEqual(true)
    })

    it('should render with expected iconOptions prop', () => {
      expect(
        component.prop('iconOptions')
      ).toEqual(['fa-volume-off', 'fa-volume-up'])
    })
  })

  describe('toggle function', () => {
    beforeEach(() => {
      component = shallowComponent()
    })

    it('should render with expected state', () => {
      expect(component.state().status).toEqual(true)
    })
  
    it('should toggle state.status', () => {
      component.dive().simulate('click')
  
      expect(component.state().status).toEqual(false)
    })
  
    it('should render with expected props', () => {
      expect(component.find('IconButton').props().icon).toEqual('fa-volume-up')
    })
  
    it('should toggle icon prop', () => {
      component.dive().simulate('click')
  
      expect(component.find('IconButton').props().icon).toEqual('fa-volume-off')
    })
  })
})
