import React, {
  createContext,
  createElement,
  useEffect,
  useState,
  memo,
} from 'react'
import docsData from './docs-data'
import styles from './DocsContainer.module.css'
import DocsTreeItemContent from './DocsTreeItemContent'
import DocsTree from './DocsTree'
import _get from 'lodash.get'

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

function DocsContainer() {
  const path = decodeURI(window.location.search).replace('?path=', '')
  const [activeItem, setActiveItem] = useState()
  const [SingleComponent, setSingleComponent] = useState()

  useEffect(() => {
    ;(async () => {
      if (!!path) {
        const componentInfo = _get(docsData, path)
        const c = await componentInfo.component
        setSingleComponent(
          createElement(c[componentInfo.name] ?? c.default, {})
        )
      } else {
        setActiveItem(defaultItem)
      }
    })()
  }, [])

  return !!path ? (
    SingleComponent ? (
      SingleComponent
    ) : null
  ) : (
    <DocsContext.Provider value={{ activeItem, setActiveItem }}>
      <div className={styles['docs-container']}>
        <div className={styles['docs-sidebar']}>
          <DocsTree data={docsData} />
        </div>

        {activeItem && <DocsTreeItemContent {...activeItem} />}
      </div>
    </DocsContext.Provider>
  )
}

export default memo(DocsContainer)

export { DocsContext }
