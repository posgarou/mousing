var path = require('path');

var SRC_DIR = "./src";
var DEST_DIR = "./dist";

var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: SRC_DIR + "/index.jsx",

  resolve: {
    extensions: [
      "",
      ".js"
    ],
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: "babel",
        include: path.resolve(SRC_DIR),
        query: {
          stage: 1
        }
      },

      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      },

      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          "style-loader",
          "css-loader!autoprefixer-loader!sass-loader"
        ),
        include: path.resolve(SRC_DIR)
      },

      {
        test: /\.(jpe?g|png|gif|svg|mp3)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]'
        ]
      }
    ]
  },

  output: {
    path: DEST_DIR,
    filename: "index.js"
  },

  plugins: [
    new ExtractTextPlugin("[name].css")
  ]
};
