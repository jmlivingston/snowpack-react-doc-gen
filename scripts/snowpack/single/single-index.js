import { createElement } from 'react'
import { render } from 'react-dom'
// Note: Switch out Component path and props to test other components
import Component from '../../../src/components/Button/Button.jsx'

const props = { children: 'My Button', onClick: console.log }

function renderComponent(component) {
  render(createElement(component, props), document.getElementById('root'))
  if (import.meta.hot) {
    import.meta.hot.accept()
  }
}

renderComponent(Component)
