import React, { useContext } from 'react'
import DocsTreeItem from './DocsTreeItem'
import { DocsContext } from './DocsContainer'

function DocsTree({ data }) {
  const { activeItem, setActiveItem } = useContext(DocsContext)
  return (
    <ul>
      {Object.entries(data).map(([key, value]) => {
        const { children, ...properties } = value
        return children ? (
          <li key={key}>
            {Object.keys(properties).length ? (
              <DocsTreeItem {...properties} setActiveItem={setActiveItem} />
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
            <DocsTreeItem {...value} setActiveItem={setActiveItem} />
          </li>
        )
      })}
    </ul>
  )
}

export default DocsTree
