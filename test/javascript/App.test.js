import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { shallow } from 'enzyme'

import Store from 'main/store'
import App from 'main/App'

describe('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')

    ReactDOM.render(
      <Provider store={Store}>
        <App />
      </Provider>,
      div
    )

    ReactDOM.unmountComponentAtNode(div)
  })

  it('should render correctly in "debug" mode', () => {
    const component = shallow(
      <Provider store={Store}>
        <App debug />
      </Provider>
    )
  
    expect(component).toMatchSnapshot()
  });
})
