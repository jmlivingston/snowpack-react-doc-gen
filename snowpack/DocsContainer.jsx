import React, {
  createElement,
  lazy,
  Suspense,
  useEffect,
  useState,
} from 'react'
import docsData from './docs-data'
import styles from './DocsContainer.module.css'

function getActiveItem(data) {
  let activeItem
  Object.entries(data).every(([key, value]) => {
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

function DocsTreeItem({ nameDisplay }) {
  return <a href="">{`${nameDisplay}x`}</a>
}

function DocsTreeItemContent({
  component,
  filePath,
  name,
  isCombined,
  nameDisplay,
  parent,
}) {
  const [Component, setComponent] = useState(null)
  useEffect(() => {
    ;(async () => {
      const c = await component
      setComponent(createElement(c?.default ?? c[0], {}))
    })()
  }, [])
  return Component ? <>{Component}</> : null
}

function DocsTree({ activeItem, data, setActiveItem }) {
  return (
    <ul>
      {Object.entries(data).map(([key, value]) => {
        const { children, ...properties } = value
        return children ? (
          <li key={key}>
            {Object.keys(properties).length ? (
              <DocsTreeItem {...properties} />
            ) : (
              value.nameDisplay ?? key
            )}
            <DocsTree
              activeItem={activeItem}
              data={value.children}
              setActiveItem={setActiveItem}
            />
          </li>
        ) : (
          <li key={key}>
            <DocsTreeItem {...value} />
          </li>
        )
      })}
    </ul>
  )
}

function DocsContainer() {
  const [activeItem, setActiveItem] = useState(getActiveItem(docsData))
  return (
    <div className={styles.wrapper}>
      <div>
        <DocsTree data={docsData} setActiveItem={setActiveItem} />
      </div>
      <div>
        {activeItem && <DocsTreeItemContent {...activeItem} />}
        <pre>
          <code>{JSON.stringify(docsData, null, 2)}</code>
        </pre>
      </div>
    </div>
  )
}

export default DocsContainer
