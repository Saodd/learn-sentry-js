const { merge } = require('webpack-merge');
const common = require('./webpack.config.js');
const webpack = require('webpack');
const SentryPlugin = require('@sentry/webpack-plugin');
const DeleteSourceMapWebpackPlugin = require('./webpackDeleteSourcemapPlugin');
const WebpackObfuscator = require('webpack-obfuscator');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'hidden-source-map',
  plugins: [
    new webpack.DefinePlugin({
      __NPM_VERSION__: JSON.stringify(require('./project.json').version),
    }),
    new WebpackObfuscator(
      {
        compact: true,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 1,
        deadCodeInjection: false,
        deadCodeInjectionThreshold: 0,
        debugProtection: false,
        debugProtectionInterval: 0,
        disableConsoleOutput: false,
        identifierNamesGenerator: 'hexadecimal',
        log: false,
        numbersToExpressions: true,
        renameGlobals: false,
        selfDefending: true,
        simplify: true,
        splitStrings: true,
        splitStringsChunkLength: 10,
        stringArray: true,
        stringArrayCallsTransform: true,
        stringArrayCallsTransformThreshold: 0.75,
        stringArrayEncoding: ['none', 'base64', 'rc4'],
        stringArrayIndexShift: true,
        stringArrayRotate: true,
        stringArrayShuffle: true,
        stringArrayWrappersCount: 1,
        stringArrayWrappersChainedCalls: true,
        stringArrayWrappersParametersMaxCount: 2,
        stringArrayWrappersType: 'function',
        stringArrayThreshold: 0.75,
        transformObjectKeys: true,
        unicodeEscapeSequence: false,
        sourceMap: true,
        sourceMapMode: 'separate',
      },
      ['vendors.js'],
    ),
    new SentryPlugin({
      release: require('./project.json').version,
      include: './dist',
      configFile: '.sentryclirc',
    }),
    new DeleteSourceMapWebpackPlugin(),
  ],
});
