import React from 'react'
import Button from './components/Button/Button'

function App() {
  return (
    <>
      <h1>App</h1>
      <Button onClick={(e) => console.log(e)}>My Button</Button>
    </>
  )
}

export default App
