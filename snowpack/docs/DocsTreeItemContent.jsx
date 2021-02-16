import React, { useEffect, useState, createElement } from 'react'

function DocsTreeItemContent({ component, name }) {
  const [Component, setComponent] = useState(null)
  useEffect(() => {
    ;(async () => {
      const c = await component
      setComponent(createElement(c[name] ?? c.default, {}))
    })()
  }, [component])
  return Component ? <>{Component}</> : null
}

export default DocsTreeItemContent
