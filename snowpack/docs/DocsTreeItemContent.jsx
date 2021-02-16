import React, { createElement, useEffect, useState } from 'react'
import styles from './DocsTreeItemContent.module.css'

function DocsTreeItemContent({ component, name, path }) {
  const [Component, setComponent] = useState(null)
  useEffect(() => {
    ;(async () => {
      const c = await component
      setComponent(createElement(c[name] ?? c.default, {}))
    })()
  }, [component])
  return Component ? (
    <div className={styles['docs-content']}>
      <div className={styles['docs-content-header']}>
        <span>
          {name} ({path.replace(/children./g, '')})
        </span>
        <a
          href={`?path=${encodeURIComponent(path).replace(/\./g, '%2E')}`}
          target="_blank"
          rel="noreferrer">
          Isolation Mode
        </a>
        <div style={{ clear: 'both' }}></div>
      </div>
      <hr />
      <div className={styles['docs-content-body']}>
        {Component}
        <pre>
          <code>foo</code>
        </pre>
      </div>
    </div>
  ) : null
}

export default DocsTreeItemContent
