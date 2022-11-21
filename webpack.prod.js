const { merge } = require('webpack-merge');
const common = require('./webpack.config.js');
const webpack = require('webpack');
const SentryPlugin = require('@sentry/webpack-plugin');
const DeleteSourceMapWebpackPlugin = require('./webpackDeleteSourcemapPlugin');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'hidden-source-map',
  plugins: [
    new webpack.DefinePlugin({
      __NPM_VERSION__: JSON.stringify(require('./project.json').version),
    }),
    new SentryPlugin({
      release: require('./project.json').version,
      include: './dist',
      configFile: '.sentryclirc',
    }),
    new DeleteSourceMapWebpackPlugin(),
  ],
});
