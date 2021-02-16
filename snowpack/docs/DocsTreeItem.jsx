import React, { useContext } from 'react'
import { DocsContext } from './DocsContainer'

function DocsTreeItem({ component, nameDisplay }) {
  const { setActiveItem } = useContext(DocsContext)

  function onClick(e) {
    setActiveItem({ component })
  }
  return <button onClick={onClick}>{`${nameDisplay}`}</button>
}

export default DocsTreeItem
