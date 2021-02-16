import Button from './Button'
import React from 'react'

function ButtonYellow() {
  return <Button>Yellow</Button>
}

ButtonYellow.config = {
  parent: 'Core|Button',
  isCombined: true,
  name: 'ButtonYellow',
  nameDisplay: 'Button Yellow',
}

export default ButtonYellow
