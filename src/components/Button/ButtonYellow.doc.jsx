import React from 'react'
import Button from './Button'

function ButtonYellow() {
  return <Button className="yellow">Yellow</Button>
}

ButtonYellow.config = {
  parent: 'Core|Button',
  isCombined: true,
  name: 'ButtonYellow',
  nameDisplay: 'Button Yellow',
}

export default ButtonYellow
