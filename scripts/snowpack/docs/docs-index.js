import { createElement } from 'react'
import { render } from 'react-dom'
import DocsContainer from './components/DocsContainer.jsx'

function renderComponent(component) {
  render(createElement(component), document.getElementById('root'))
  if (import.meta.hot) {
    import.meta.hot.accept()
  }
}

renderComponent(DocsContainer)
