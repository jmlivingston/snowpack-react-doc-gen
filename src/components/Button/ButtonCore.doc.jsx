import React from 'react'
import Button from './Button'

function ButtonCore() {
  return <Button>Core</Button>
}

ButtonCore.config = {
  isCombined: true,
  name: 'Button',
  nameDisplay: 'Button',
  parent: 'Core',
}

export default ButtonCore
