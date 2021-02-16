/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  buildOptions: {
    baseUrl: '/snowpack-react-doc-gen',
  },
  exclude: ['**/node_modules/**/*', '**/scripts/**/*'],
  routes: [{ match: 'routes', src: '.*', dest: '/snowpack/single-index.html' }],
}
