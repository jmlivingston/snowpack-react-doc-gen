import React from 'react'
import Button from './Button'

function ButtonCore() {
  return <Button>Core</Button>
}

ButtonCore.config = { name: 'Button', nameDisplay: 'Button', parent: 'Core' }

export default ButtonCore
