// IconButton Unit Test

import React from 'react'
import { mount, shallow } from 'enzyme'

import { IconButton } from '@components/IconButton'

describe('<IconButton/>', () => {
  let props, wrapper

  beforeEach(() => {
    props = {
      buttonProps: {
        buttonClass: 'btn-clear',
        handleClick: jest.fn(),
      },
      iconProps: {
        icon: 'fa-plus',
      },
      text: 'MY LIST',
      textPlacement: 'left',
    }
  })

  describe('render', () => {
    it('should match snapshot', () => {
      wrapper = shallow(<IconButton  {...props} />)

      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('props', () => {
    beforeEach(() => {
      wrapper = mount(<IconButton  {...props} />)
    })

    it('should render expected buttonClass prop', () => {
      expect(wrapper.find('button').hasClass(props.buttonProps.buttonClass)).toEqual(true)
    })

    it('should render expected icon prop', () => {  
      expect(wrapper.find('button i').hasClass(props.iconProps.icon)).toEqual(true)
    })

    it('should render expected text prop', () => {  
      expect(wrapper.find('button').text()).toEqual(props.text)
    })
  })

  describe('onClick', () => {
    beforeEach(() => {
      wrapper = mount(<IconButton  {...props} />)
      wrapper.find('button').simulate('click')
    })

    it('should call buttonProps.handleClick', () => {
      expect(props.buttonProps.handleClick.mock.calls.length).toEqual(1)
    })
  })
})
