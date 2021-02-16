import React, { useEffect, useState, createElement } from 'react'
import styles from './DocsTreeItemContent.module.css'

function DocsTreeItemContent({ component, name }) {
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
        <span>{name}</span>
        <button>⬈</button>
        <div style={{ clear: 'both' }}></div>
      </div>
      <hr />
      <div className={styles['docs-content-body']}>{Component}</div>
    </div>
  ) : null
}

export default DocsTreeItemContent
