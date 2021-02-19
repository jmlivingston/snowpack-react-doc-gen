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
          {name}
          {/* TODO: import statement? */}
          {/* ({path.replace(/children./g, '')}) */}
        </span>
        <div className={styles['docs-link-container']}>
          <a
            className={styles['docs-link']}
            href={`?path=${encodeURIComponent(path).replace(/\./g, '%2E')}`}
            target="_blank"
            rel="noreferrer">
            Isolation Mode &#8599;
          </a>
          <a
            className={styles['docs-link']}
            href="https://github.com/jmlivingston/snowpack-react-doc-gen"
            target="_blank"
            rel="noreferrer">
            Code &#8599;
          </a>
        </div>
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
