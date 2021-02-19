import React from 'react'
import Button from './Button'

function ButtonYellow() {
  return <Button className="yellow">Yellow</Button>
}

ButtonYellow.config = { parent: 'Core|Button', name: 'ButtonYellow', nameDisplay: 'Yellow' }

export default ButtonYellow
