import React from 'react'
import Button from './Button'

function ButtonBlue() {
  return <Button className="blue">Blue</Button>
}

ButtonBlue.config = { name: 'ButtonBlue', nameDisplay: 'Blue', parent: 'Core|Button' }

function ButtonGreen() {
  return <Button className="green">Green</Button>
}

ButtonGreen.config = { name: 'ButtonGreen', nameDisplay: 'Green', parent: 'Core|Button' }

export { ButtonBlue, ButtonGreen }
