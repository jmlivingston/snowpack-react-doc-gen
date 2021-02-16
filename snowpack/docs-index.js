import { createElement } from 'react'
import { render } from 'react-dom'
import DocsContainer from './docs/DocsContainer.jsx'

function renderComponent(component) {
  render(createElement(component), document.getElementById('root'))
}

renderComponent(DocsContainer)
