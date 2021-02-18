import React, { createElement, useEffect, useState } from 'react'
import Code from './Code'
import styles from './DocsTreeItemContent.module.css'

function DocsTreeItemContent({ code, component, name, path }) {
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
        <span className={styles['docs-content-header-title']}>
          {name} ({path.replace(/children./g, '')})
        </span>
        <a
          className={styles['isolation-mode-link']}
          href={`?path=${encodeURIComponent(path).replace(/\./g, '%2E')}`}
          target="_blank"
          rel="noreferrer">
          Isolation Mode
        </a>
        <div style={{ clear: 'both' }}></div>
      </div>
      <hr />
      <div className={styles['docs-content-body']}>{Component}</div>
      <hr />
      <div className={styles['docs-content-body']}>
        <Code code={code} />
      </div>
    </div>
  ) : null
}

export default DocsTreeItemContent
