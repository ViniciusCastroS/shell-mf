const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  remotes: {
    "angular_mf": "http://localhost:4201/remoteEntry.js",
    "reactMF": "http://localhost:3001/remoteEntry.js",
  },
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },
});
