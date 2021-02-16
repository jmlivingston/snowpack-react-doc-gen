import React from 'react'
import App from './App'

function AppCore() {
  return <App />
}

AppCore.config = {
  isCombined: true,
  name: 'App',
  nameDisplay: 'App',
  parent: 'Examples',
}

export default AppCore
