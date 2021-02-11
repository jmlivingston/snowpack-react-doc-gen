import { createElement } from 'react'
import { render } from 'react-dom'
import Button from '../src/components/Button/Button.jsx'

const props = {
  children: 'Test',
  onClick: () => {
    console.log('foo')
  },
}

function renderComponent(component) {
  render(createElement(component, props), document.getElementById('root'))
}

renderComponent(Button)
