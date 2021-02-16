const data = {
  Core: {
    children: {
      Button: {
        children: {
          ButtonBlue: {
            component: import('../../src/components/Button/Button.doc.jsx'),
            name: 'ButtonBlue',
            isCombined: true,
            nameDisplay: 'Blue',
            parent: 'Core|Button',
            path: 'Core.children.Button.children.ButtonBlue',
          },
          ButtonGreen: {
            component: import('../../src/components/Button/Button.doc.jsx'),
            name: 'ButtonGreen',
            isCombined: true,
            nameDisplay: 'Green',
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
            nameDisplay: 'Yellow',
            path: 'Core.children.Button.children.ButtonYellow',
          },
        },
        component: import('../../src/components/Button/ButtonCore.doc.jsx'),
        name: 'Button',
        isCombined: true,
        nameDisplay: 'Core',
        parent: 'Core',
        path: 'Core.children.Button',
      },
    },
  },
}

export default data
