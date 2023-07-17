const { removeModuleScopePlugin } = require("customize-cra");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = function override(config, env) {
  if (!config.plugins) {
    config.plugins = [];
  }
  removeModuleScopePlugin()(config);

  config.plugins.push(
    new CopyWebpackPlugin({
      patterns: [
        { from: "core-sdk", to: "core-sdk" },
        { from: "core", to: "core" },
      ],
    })
  );

  return config;
};
