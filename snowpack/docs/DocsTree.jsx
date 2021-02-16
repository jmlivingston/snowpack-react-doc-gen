import React, { useContext } from 'react'
import { DocsContext } from './DocsContainer'
import DocsTreeItem from './DocsTreeItem'

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
              <span>{value.nameDisplay ?? key}</span>
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
