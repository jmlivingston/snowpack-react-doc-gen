export default {
  Core: {
    children: {
      Button: {
        children: {
          ButtonBlue: {
            component: import('../src/components/Button/Button.doc.jsx'),
            name: 'ButtonBlue',
            isCombined: true,
            nameDisplay: 'Button Blue',
            parent: 'Core|Button',
          },
          ButtonGreen: {
            component: import('../src/components/Button/Button.doc.jsx'),
            name: 'ButtonGreen',
            isCombined: true,
            nameDisplay: 'Button Green',
            parent: 'Core|Button',
          },
          ButtonYellow: {
            component: import('../src/components/Button/ButtonYellow.doc.jsx'),
            name: 'ButtonYellow',
            parent: 'Core|Button',
            isCombined: true,
            nameDisplay: 'Button Yellow',
          },
        },
        component: import('../src/components/Button/ButtonCore.doc.jsx'),
        name: 'Button',
        isCombined: true,
        nameDisplay: 'Button',
        parent: 'Core',
      },
    },
  },
}
