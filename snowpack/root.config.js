/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  buildOptions: {
    baseUrl: '/snowpack-react-doc-gen',
  },
  routes: [{ match: 'routes', src: '.*', dest: '/snowpack/root-index.html' }],
}