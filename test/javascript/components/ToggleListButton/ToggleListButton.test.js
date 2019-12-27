import React from 'react'
import { shallow } from 'enzyme'

import ToggleListButton from '@components/ToggleListButton'

describe('ToggleListButton', () => {
  const mockToggle = jest.fn()

  const shallowComponent = () => shallow(
    <ToggleListButton
      movie={{ id: 1, title: 'The Avengers' }}
      iconOptions={['fa-thumbs-o-up', 'fa-thumbs-up']}
      listName="LikedList"
      updateContainer={mockToggle}
    />
  )

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
  })
})
