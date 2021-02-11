import { createElement } from 'react'
import { render } from 'react-dom'
import DocsContainer from './DocsContainer.jsx'

const props = {
  children: 'Docs',
}

function renderComponent(component) {
  render(createElement(component, props), document.getElementById('root'))
}

renderComponent(DocsContainer)
