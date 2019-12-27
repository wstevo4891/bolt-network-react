import React from 'react'
import { shallow } from 'enzyme'

import { ToggleIconButton } from '@components/IconButton'

describe('ToggleIconButton', () => {
  const shallowComponent = () => shallow(
    <ToggleIconButton
      status={true}
      iconOptions={['fa-volume-off', 'fa-volume-up']}
    />
  )

  let component = shallowComponent()

  it('should render correctly in "debug" mode', () => {
    expect(component).toMatchSnapshot()
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
