import React from 'react'
import styles from './DocsTreeItem.module.css'

function DocsTreeItem({
  hasExpander,
  isActive,
  isExpanded,
  name,
  value,
  onClick,
}) {
  return (
    <span
      className={`${styles['docs-tree-item']} ${
        styles[`${hasExpander ? '' : 'not-expandable'}`]
      }  ${isExpanded ? '' : styles['expanded']} ${
        styles[`${isActive ? 'active' : ''}`]
      }`}
      onClick={() => onClick({ name, value })}>
      {name}
      {/* {value ? <span className={styles['is-component']}>•</span> : ''} */}
    </span>
  )
}

export default DocsTreeItem
