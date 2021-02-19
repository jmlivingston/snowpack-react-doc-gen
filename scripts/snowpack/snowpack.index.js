import { createElement } from 'react'
import { render } from 'react-dom'
;(async () => {
  let component
  const dest = new URL(import.meta.url).searchParams.get('dest')
  let props = {}
  switch (dest) {
    case 'app':
      await import('../../src')
      break
    case 'docs':
      const docs = await import('./docs/components/DocsContainer')
      component = docs.default
      break
    case 'single':
      // Update path and props for different components
      const single = await import('../../src/components/Button/Button')
      props = { children: 'My Button', onClick: console.log }
      component = single.default
      break
  }
  if (dest !== 'app') {
    render(createElement(component, props), document.getElementById('root'))
  }
  if (import.meta.hot) {
    import.meta.hot.accept()
  }
})()
