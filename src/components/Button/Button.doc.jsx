import Button from './Button'

function ButtonBlue() {
  return <Button>Blue</Button>
}

ButtonBlue.config = {
  isCombined: true,
  name: 'ButtonBlue',
  nameDisplay: 'Button Blue',
  parent: 'Core|Button',
}

function ButtonGreen() {
  return <Button>Green</Button>
}

ButtonGreen.config = {
  isCombined: true,
  name: 'ButtonGreen',
  nameDisplay: 'Button Green',
  parent: 'Core|Button',
}

export { ButtonBlue, ButtonGreen }
