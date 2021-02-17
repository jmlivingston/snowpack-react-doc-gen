import React, { useContext, useState } from 'react'
import { DocsContext } from './DocsContainer'
import styles from './DocsTree.module.css'
import DocsTreeItem from './DocsTreeItem'

function DocsTree({ data }) {
  const { activeItem, setActiveItem } = useContext(DocsContext)
  const [expanded, setExpanded] = useState({})

  function onClick({ value, name }) {
    if (value) {
      setActiveItem(value)
    }
    setExpanded({
      ...expanded,
      [name]: expanded?.[name] !== undefined ? !expanded[name] : false,
    })
  }

  return (
    <ul>
      {Object.entries(data).map(([key, value]) => {
        const { children, ...properties } = value
        const name = properties.nameDisplay ?? key
        const isExpanded =
          expanded?.[name] !== undefined ? expanded[name] : true
        return children ? (
          <li key={key} className={styles[`docs-tree-expanded-${isExpanded}`]}>
            <DocsTreeItem
              hasCaret={true}
              isExpanded={isExpanded}
              name={name}
              onClick={onClick}
              value={Object.keys(properties).length ? properties : null}
            />
            <DocsTree
              activeItem={activeItem}
              data={children}
              setActiveItem={setActiveItem}
            />
          </li>
        ) : (
          <li key={key}>
            <DocsTreeItem
              hasCaret={false}
              isExpanded={isExpanded}
              name={name}
              value={properties}
              onClick={onClick}
            />
          </li>
        )
      })}
    </ul>
  )
}

export default DocsTree
