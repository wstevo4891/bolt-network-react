import React from 'react'
import { mount, shallow } from 'enzyme'

import { ToggleIconButton } from '@components/IconButton'

describe('<ToggleIconButton/>', () => {
  let props, wrapper

  beforeEach(() => {
    props = {
      status: true,
      options: ['fa-volume-off', 'fa-volume-up'],
    }
  })

  describe('render', () => {
    beforeEach(() => {
      wrapper = shallow(<ToggleIconButton {...props} />)
    })

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should render with expected icon', () => {
      expect(wrapper.find('IconButton').props().iconProps.icon).toEqual(props.options[0])
    })
  })

  describe('toggle function', () => {
    beforeEach(() => {
      wrapper = mount(<ToggleIconButton {...props} />)

      wrapper.simulate('click')
    })

    it('should toggle icon prop', () => {  
      expect(wrapper.find('IconButton').props().iconProps.icon).toEqual(props.options[1])
    })
  })
})
