export default {
  Examples: {
    children: {
      App: {
        component: import('../../../../src/App.doc.jsx'),
        name: 'App',
        isCombined: true,
        nameDisplay: 'App',
        parent: 'Examples',
        path: 'Examples.children.App',
        code: "import App from './App'\n\nfunction AppCore() {\n  return <App />\n}",
      },
    },
  },
  Core: {
    children: {
      Button: {
        children: {
          ButtonBlue: {
            component: import('../../../../src/components/Button/Button.doc.jsx'),
            name: 'ButtonBlue',
            isCombined: true,
            nameDisplay: 'Button Blue',
            parent: 'Core|Button',
            path: 'Core.children.Button.children.ButtonBlue',
            code:
              'import Button from \'./Button\'\n\nfunction ButtonBlue() {\n  return <Button className="blue">Blue</Button>\n}',
          },
          ButtonGreen: {
            component: import('../../../../src/components/Button/Button.doc.jsx'),
            name: 'ButtonGreen',
            isCombined: true,
            nameDisplay: 'Button Green',
            parent: 'Core|Button',
            path: 'Core.children.Button.children.ButtonGreen',
            code:
              'import Button from \'./Button\'\n\nfunction ButtonGreen() {\n  return <Button className="green">Green</Button>\n}',
          },
          ButtonYellow: {
            component: import('../../../../src/components/Button/ButtonYellow.doc.jsx'),
            name: 'ButtonYellow',
            parent: 'Core|Button',
            isCombined: true,
            nameDisplay: 'Button Yellow',
            path: 'Core.children.Button.children.ButtonYellow',
            code:
              'import Button from \'./Button\'\n\nfunction ButtonYellow() {\n  return <Button className="yellow">Yellow</Button>\n}',
          },
        },
        component: import('../../../../src/components/Button/ButtonCore.doc.jsx'),
        name: 'Button',
        isCombined: true,
        nameDisplay: 'Button',
        parent: 'Core',
        path: 'Core.children.Button',
        code: "import Button from './Button'\n\nfunction ButtonCore() {\n  return <Button>Core</Button>\n}",
      },
    },
  },
}
