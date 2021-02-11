/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  buildOptions: {
    baseUrl: '/snowpack-react-doc-gen',
  },
  root: '/src',
  routes: [{ match: 'routes', src: '.*', dest: '/snowpack/docs-index.html' }],
}
