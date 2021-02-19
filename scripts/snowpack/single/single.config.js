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
      dest: '/scripts/snowpack/single/single-index.html',
    },
  ],
}
