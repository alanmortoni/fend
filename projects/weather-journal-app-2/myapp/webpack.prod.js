const path = require('path');
const webpack = require('webpack');
const HTMLWebPackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');



module.exports = {
    entry: './src/client/js/index.js',
    mode: 'development',
    node: {
      fs: "empty"
   },
   module: {
  	rules: [
  		{
  			test: '/\.js$/',
  			exclude: /node_modules/,
  			loader: 'babel-loader'
  		}
  	]
  },
  plugins: [
    new HTMLWebPackPlugin({
      template: './src/client/views/index.html',
      filename: 'index.html'
    }),
    new WorkboxPlugin.GenerateSW()
  ]
}

  