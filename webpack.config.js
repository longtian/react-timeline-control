/**
 * Created by yan on 16-1-19.
 */
var path = require('path');
module.exports = {
  entry: path.join(__dirname, 'example', 'index.jsx'),
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /.jsx/,
      loader: 'babel'
    }]
  },
  devServer:{
    port:8081
  }
}