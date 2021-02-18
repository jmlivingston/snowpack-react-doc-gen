import _get from 'lodash.get'
import React, {
  createContext,
  createElement,
  memo,
  useEffect,
  useState,
} from 'react'
import docsData from './docs-data'
import './DocsContainer.css'
import DocsTree from './DocsTree'
import DocsTreeItemContent from './DocsTreeItemContent'
import Sidenav from './Sidenav'

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
      return false
    }
  })
  return activeItem
}

// TODO: Remove dummyData (used to test scrolling)
// let dummyData = docsData.Core.children.Button.children
// for (let i = 0; i < 20; i++) {
//   dummyData = {
//     ...dummyData,
//     ...{
//       [`ButtonBlue${i}`]: {
//         ...dummyData.ButtonBlue,
//         nameDisplay: `ButtonBlue${i}`,
//       },
//       [`ButtonGreen${i}`]: {
//         ...dummyData.ButtonGreen,
//         nameDisplay: `ButtonGreen${i}`,
//       },
//       [`ButtonYellow${i}`]: {
//         ...dummyData.ButtonYellow,
//         nameDisplay: `ButtonYellow${i}`,
//       },
//     },
//   }
// }
// docsData.Core.children.Button.children = dummyData

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
      <Sidenav nav={<DocsTree data={docsData} />}>
        {activeItem && <DocsTreeItemContent {...activeItem} />}
      </Sidenav>
    </DocsContext.Provider>
  )
}

export default memo(DocsContainer)

export { DocsContext }
