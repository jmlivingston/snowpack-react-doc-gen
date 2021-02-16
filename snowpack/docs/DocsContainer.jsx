import React, { createContext, useEffect, useState, memo } from 'react'
import docsData from './docs-data'
import styles from './DocsContainer.module.css'
import DocsTreeItemContent from './DocsTreeItemContent'
import DocsTree from './DocsTree'

function getActiveItem(data) {
  let activeItem
  Object.values(data).every((value) => {
    const { children, ...properties } = value
    if (Object.keys(properties).length) {
      activeItem = properties
      return false
    } else {
      if (children) {
        activeItem = getActiveItem(children)
      }
      return true
    }
  })
  return activeItem
}

const defaultItem = getActiveItem(docsData)

const DocsContext = createContext({
  activeItem: defaultItem,
  setActiveItem: () => {},
})

function DocsContainer(props) {
  const [activeItem, setActiveItem] = useState()
  useEffect(() => {
    setActiveItem(defaultItem)
  }, [])
  return (
    <DocsContext.Provider value={{ activeItem, setActiveItem }}>
      <div className={styles.wrapper}>
        <div>
          <DocsTree data={docsData} />
        </div>
        <div>{activeItem && <DocsTreeItemContent {...activeItem} />}</div>
      </div>
    </DocsContext.Provider>
  )
}

export default memo(DocsContainer)

export { DocsContext }
