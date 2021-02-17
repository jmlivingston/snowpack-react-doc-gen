import React from 'react'
import styles from './DocsTreeItem.module.css'

function DocsTreeItem({ hasCaret, isExpanded, name, value, onClick }) {
  return (
    <span
      className={`${styles[`docs-tree-caret${hasCaret ? '' : '-false'}`]}  ${
        isExpanded ? '' : styles['is-expanded-false']
      }`}
      onClick={() => onClick({ name, value })}>
      {name} {value ? <span className={styles['is-component']}>•</span> : ''}
    </span>
  )
}

export default DocsTreeItem
