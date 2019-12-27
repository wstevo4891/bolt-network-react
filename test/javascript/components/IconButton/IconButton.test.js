import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'

import { IconButton } from '@components/IconButton'

describe('IconButton', () => {
  const myListClick = jest.fn()

  it('renders without crashing', () => {
    const div = document.createElement('div')

    ReactDOM.render(
      <IconButton
        buttonClass="btn-clear"
        handleClick={myListClick}
        icon="fa-plus"
        text="MY LIST"
      />,
      div
    )

    ReactDOM.unmountComponentAtNode(div)
  })

  it('should render correctly in "debug" mode', () => {
    const component = shallow(
      <IconButton
        buttonClass="btn-clear"
        handleClick={myListClick}
        icon="fa-plus"
        text="MY LIST"
      />
    )
  
    expect(component).toMatchSnapshot()
  })

  it('should respond to click event', () => {
    const component = shallow(
      <IconButton
        buttonClass="btn-clear"
        handleClick={myListClick}
        icon="fa-plus"
        text="MY LIST"
      />
    )

    component.find('button').simulate('click')

    expect(myListClick.mock.calls.length).toEqual(1)
  })
})
