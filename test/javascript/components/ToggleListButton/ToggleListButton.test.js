import React from 'react'
import { mount, shallow } from 'enzyme'

import ToggleListButton from '@components/ToggleListButton'

const mockToggle = jest.fn()

const mountedComponent = () => mount(
  <ToggleListButton
    movie={{ id: 1, title: 'The Avengers' }}
    iconOptions={['fa-thumbs-o-up', 'fa-thumbs-up']}
    listName="LikedList"
    updateContainer={mockToggle}
  />
)

const shallowComponent = () => shallow(
  <ToggleListButton
    movie={{ id: 1, title: 'The Avengers' }}
    iconOptions={['fa-thumbs-o-up', 'fa-thumbs-up']}
    listName="LikedList"
    updateContainer={mockToggle}
  />
)

describe('ToggleListButton', () => {
  let component = shallowComponent()

  it('should render correctly in "debug" mode', () => {
    expect(component).toMatchSnapshot()
  })

  it('should render with expected state', () => {
    expect(component.state().inList).toEqual(false)
  })

  describe('toggleList function', () => {
    beforeEach(() => {
      component = shallowComponent()
    })

    it('should toggle state.inList', () => {
      component.dive().dive().simulate('click')

      expect(component.state().inList).toEqual(true)

      component.dive().dive().simulate('click')

      expect(component.state().inList).toEqual(false)
    })

    it('should toggle child icon prop', () => {
      expect(component.dive().props().icon).toEqual('fa-thumbs-o-up')

      component.dive().dive().simulate('click')

      expect(component.dive().props().icon).toEqual('fa-thumbs-up')
    })
  })
})
