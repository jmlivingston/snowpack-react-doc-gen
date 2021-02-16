import React, { useContext } from 'react'
import { DocsContext } from './DocsContainer'

function DocsTreeItem({ component, name, nameDisplay }) {
  const { setActiveItem } = useContext(DocsContext)

  function onClick() {
    setActiveItem({ component, name })
  }
  return <button onClick={onClick}>{`${nameDisplay}`}</button>
}

export default DocsTreeItem
