# Snowpack with create-react-app

## Summary

This repository demonstrates how to get Snowpack set up in an existing create-react-app application. There are three examples, that can be used independently or together depending on what your workflow is.

- app - Run the core app that is generated by create-react-app.
- single - Runs a single component within the app which is very helpful for debugging.
- docs - Similar to Storybook or Styleguidist, but with a very minimal feature set. One of my favorite things about Storybook is the ability to browse components and debug them independently. However, I have found Storybook extremely slow, especially on large projects.

## Notes

- Structure - I prefer to have my root directory less cluttered, so most of the snowpack or utility code is within a "scripts" directory. You can always move this to a "util" directory or to the root, but will need to update any paths.
- Prettier - Update the prettier config in package.json to matchy your preferences.
- JSX - By default, Snowpack expects files with JSX to have a ".jsx" extension. However, you can use the @snowpack/plugin-babel to handle this separately.
- Node 12.4+ is required to run any .mjs files which allow ES modules. These can be easily refactored as CommonJS.
- These are purposely very simple examples and should just be a starting point.

## Instructions

The following instructions assume you have already created an app with create-react-app. You can do this easily, by running `npx create-react-app my-app`.

> TLDR: 1.) Copy and paste the scripts directory into a create-react-app project, 2.) `npm i snowpack -d`, 3.) Add the snowpack scripts in package.json. 4.) Run the snowpack scripts. (`npm run snowpack-app`) 5.) Update "single-index.js" to point to one of your components and update the props variable accordingly. For "docs", follow the details instructions below.

### app / single

The steps for "app" and "single" are nearly identical except for the initial component they are pointing to. Keeping separate instances can be helpful when debugging. In this case we'll set up "app".

- Install snowpack as a dev dependency

```bash
npm i snowpack -D
```

- Create a "scripts/snowpack/app" directory and add the following three files:

1. app-index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="./public/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="Web site created using create-react-app" />
    <link rel="apple-touch-icon" href="./public/logo192.png" />
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <script type="module" src="./scripts/snowpack/app/app-index.js"></script>
  </body>
</html>
```

2. app-index.js

```js
import '../../../src/index.jsx'
```

3. app.config.js

```js
/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  buildOptions: {
    baseUrl: '/snowpack-react-doc-gen',
    sourcemap: true,
  },
  exclude: ['**/node_modules/**/*', '**/scripts/**/*'],
  routes: [
    {
      match: 'routes',
      src: '.*',
      dest: '/scripts/snowpack/app/app-index.html',
    },
  ],
}
```

- Update package.json scripts with the following:

```json
"snowpack-app": "snowpack dev --config scripts/snowpack/app/app.config.js --open none",
```

- Run the app!

```bash
npm run snowpack-app
```

> Note: If you have any snowpack cache errors, you may try adding `--reload` to the end of the snowpack script in package.json.

### docs

Follow the steps above, but substitute "docs" for "app", then do the following:

- Update docs-index.js

```js
import { createElement } from 'react'
import { render } from 'react-dom'
import DocsContainer from './components/DocsContainer.jsx'

function renderComponent(component) {
  render(createElement(component), document.getElementById('root'))
  if (import.meta.hot) {
    import.meta.hot.accept()
  }
}

renderComponent(DocsContainer)
```

- Copy the "scripts/snowpack/docs/components" directory from this repo into yours, ommiting the "docs-data.js" file. This includes a few simple components to provide the "docs" site layout which consists of a side nav with tree components and a main content area.

- Copy util.mjs into scripts and docs-build.mjs into scripts/snowpack/docs. These scripts are used to recursively look for ".doc.jsx" files which we are using to build our documentation.

- Create a "doc.jsx". This is a very simple, yet opinionated way of rendering examples of your components. This is similar to what a ".stories.js" file would be in "Storybook". In a nutshell, create a component that will import your target component, apply some props if necessary, add a static property "config" with meta data, then export. Either export as a single default or export multiple named components. The config consists of 3 properties:

  - name - Name of component.
  - nameDisplay - Name to display in docs.
  - parent - Pipe delimited namespaced path for component.

```js
import React from 'react'
import Button from './Button'

function ButtonYellow() {
  return <Button className="yellow">Yellow</Button>
}

ButtonYellow.config = { parent: 'Core|Button', name: 'ButtonYellow', nameDisplay: 'Button Yellow' }

export default ButtonYellow
```

- Add the following npm script to package.json:

```json
"build-docs": "node scripts/snowpack/docs/docs-build.mjs"
```

- Run the npm script

```bash
npm run build-docs
```

---

> The following was generated by create-react-app

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
