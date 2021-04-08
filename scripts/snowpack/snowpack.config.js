// dest variable comes from args passed through npm scripts. Not used by Snowpack.
const dest = process.argv.find((arg) => arg.includes('--dest=')).split('=')[1]

const isBuild = process.argv.includes('build')

module.exports = {
  buildOptions: {
    baseUrl: '/snowpack-react-doc-gen',
    sourcemap: true,
  },
  exclude: ['**/node_modules/**/*', '**/scripts/**/*.mjs'],
  plugins: ['@snowpack/plugin-react-refresh'],
  routes: [
    {
      match: 'routes',
      src: '.*',
      // Note: dest can be a property that returns a path instead
      dest: isBuild
        ? '/public/index.html'
        : (_req, res) => {
            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.write(`<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="utf-8" />
            <link rel="icon" href="./public/favicon.ico" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#000000" />
            <meta name="description" content="Web site created using create-react-app" />
            <link rel="apple-touch-icon" href="./public/logo192.png" />
            <title>${`React App - ${dest.charAt(0).toUpperCase() + dest.slice(1)}`}</title>
          </head>
          <body>
            <noscript>You need to enable JavaScript to run this app.</noscript>
            <div id="root"></div>
            <script type="module" src="${`./scripts/snowpack/snowpack.index.js?dest=${dest}`}"></script>
          </body>
        </html>
        `)
            res.end()
          },
    },
  ],
}
