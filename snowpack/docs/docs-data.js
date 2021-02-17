export default {
  Examples: {
    children: {
      App: {
        component: import('../../src/App.doc.jsx'),
        name: 'App',
        isCombined: true,
        nameDisplay: 'App',
        parent: 'Examples',
        path: 'Examples.children.App',
      },
    },
  },
  Core: {
    children: {
      Button: {
        children: {
          ButtonBlue: {
            component: import('../../src/components/Button/Button.doc.jsx'),
            name: 'ButtonBlue',
            isCombined: true,
            nameDisplay: 'Button Blue',
            parent: 'Core|Button',
            path: 'Core.children.Button.children.ButtonBlue',
          },
          ButtonGreen: {
            component: import('../../src/components/Button/Button.doc.jsx'),
            name: 'ButtonGreen',
            isCombined: true,
            nameDisplay: 'Button Green',
            parent: 'Core|Button',
            path: 'Core.children.Button.children.ButtonGreen',
          },
          ButtonYellow: {
            component: import(
              '../../src/components/Button/ButtonYellow.doc.jsx'
            ),
            name: 'ButtonYellow',
            parent: 'Core|Button',
            isCombined: true,
            nameDisplay: 'Button Yellow',
            path: 'Core.children.Button.children.ButtonYellow',
          },
        },
        component: import('../../src/components/Button/ButtonCore.doc.jsx'),
        name: 'Button',
        isCombined: true,
        nameDisplay: 'Button',
        parent: 'Core',
        path: 'Core.children.Button',
      },
    },
  },
}
