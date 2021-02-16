import React, { useContext } from 'react'
import { DocsContext } from './DocsContainer'

function DocsTreeItem({ component, name, nameDisplay, path }) {
  const { setActiveItem } = useContext(DocsContext)

  function onClick() {
    setActiveItem({ component, name, path })
  }
  return <button onClick={onClick}>{`${nameDisplay}`}</button>
}

export default DocsTreeItem
