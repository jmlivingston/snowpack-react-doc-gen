import Button from './Button'

function ButtonBlue() {
  return <Button>Blue</Button>
}

ButtonBlue.config = {
  category: 'Core.Button',
  isCombined: true,
  title: 'Button Blue',
}

function ButtonGreen() {
  return <Button>Green</Button>
}

ButtonGreen.config = {
  category: 'Core.Button',
  isCombined: true,
  title: 'Button Green',
}

export { ButtonBlue, ButtonGreen }
