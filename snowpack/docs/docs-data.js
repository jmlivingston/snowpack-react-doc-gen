export default {
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
            code:
              "import React from 'react'\nimport Button from './Button'\n\nfunction ButtonBlue() {\n  return <Button className=\"blue\">Blue</Button>\n}\n\nButtonBlue.config = {\n  isCombined: true,\n  name: 'ButtonBlue',\n  nameDisplay: 'Button Blue',\n  parent: 'Core|Button',\n}\n\nfunction ButtonGreen() {\n  return <Button className=\"green\">Green</Button>\n}\n\nButtonGreen.config = {\n  isCombined: true,\n  name: 'ButtonGreen',\n  nameDisplay: 'Button Green',\n  parent: 'Core|Button',\n}\n\nexport { ButtonBlue, ButtonGreen }\n",
          },
          ButtonGreen: {
            component: import('../../src/components/Button/Button.doc.jsx'),
            name: 'ButtonGreen',
            isCombined: true,
            nameDisplay: 'Button Green',
            parent: 'Core|Button',
            path: 'Core.children.Button.children.ButtonGreen',
            code:
              "import React from 'react'\nimport Button from './Button'\n\nfunction ButtonBlue() {\n  return <Button className=\"blue\">Blue</Button>\n}\n\nButtonBlue.config = {\n  isCombined: true,\n  name: 'ButtonBlue',\n  nameDisplay: 'Button Blue',\n  parent: 'Core|Button',\n}\n\nfunction ButtonGreen() {\n  return <Button className=\"green\">Green</Button>\n}\n\nButtonGreen.config = {\n  isCombined: true,\n  name: 'ButtonGreen',\n  nameDisplay: 'Button Green',\n  parent: 'Core|Button',\n}\n\nexport { ButtonBlue, ButtonGreen }\n",
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
            code:
              "import React from 'react'\nimport Button from './Button'\n\nfunction ButtonYellow() {\n  return <Button className=\"yellow\">Yellow</Button>\n}\n\nButtonYellow.config = {\n  parent: 'Core|Button',\n  isCombined: true,\n  name: 'ButtonYellow',\n  nameDisplay: 'Button Yellow',\n}\n\nexport default ButtonYellow\n",
          },
        },
        component: import('../../src/components/Button/ButtonCore.doc.jsx'),
        name: 'Button',
        isCombined: true,
        nameDisplay: 'Button',
        parent: 'Core',
        path: 'Core.children.Button',
        code:
          "import React from 'react'\nimport Button from './Button'\n\nfunction ButtonCore() {\n  return <Button>Core</Button>\n}\n\nButtonCore.config = {\n  isCombined: true,\n  name: 'Button',\n  nameDisplay: 'Button',\n  parent: 'Core',\n}\n\nexport default ButtonCore\n",
      },
    },
  },
  Examples: {
    children: {
      App: {
        component: import('../../src/App.doc.jsx'),
        name: 'App',
        isCombined: true,
        nameDisplay: 'App',
        parent: 'Examples',
        path: 'Examples.children.App',
        code:
          "import React from 'react'\nimport App from './App'\n\nfunction AppCore() {\n  return <App />\n}\n\nAppCore.config = {\n  isCombined: true,\n  name: 'App',\n  nameDisplay: 'App',\n  parent: 'Examples',\n}\n\nexport default AppCore\n",
      },
    },
  },
}
