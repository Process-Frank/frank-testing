/* eslint-disable */

// Configuration file for all things Slate.
// For more information, visit https://github.com/Shopify/slate/wiki/Slate-Configuration

const webpack = require('webpack');
const path = require('path');

module.exports = {
  'cssVarLoader.liquidPath': ['src/snippets/tool.css-variables.liquid'],
  'webpack.extend': {
    resolve: {
      alias: {
        '$': path.resolve('./node_modules/jquery/dist/jquery.js'),
        'jquery': path.resolve('./node_modules/jquery/dist/jquery.js')
      },
    },
    externals: {
      jquery: '$'
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        'window.$': 'jquery'
      })
    ]
  },
};
