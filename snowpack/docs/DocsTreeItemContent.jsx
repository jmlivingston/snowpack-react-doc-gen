import React, { useEffect, useState, createElement } from 'react'

function DocsTreeItemContent({ component }) {
  const [Component, setComponent] = useState(null)
  useEffect(() => {
    ;(async () => {
      const c = await component
      setComponent(createElement(c?.default ?? c[0], {}))
    })()
  }, [component])
  return Component ? <>{Component}</> : null
}

export default DocsTreeItemContent
