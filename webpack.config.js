var path = require('path');

var SRC_DIR = "./src";
var DEST_DIR = "./dist";

module.exports = {
  entry: SRC_DIR + "/index.jsx",

  resolve: {
    extensions: [
      "",
      ".js",
      ".jsx"
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
        test: /\.scss$/,
        loaders: ["style", "css", "autoprefixer", "sass"],
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
  }
};
