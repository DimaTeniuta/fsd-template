const { merge } = require('webpack-merge');
const config = require('./webpack.config');

module.exports = merge(config, {
  mode: 'development',
  devtool: 'eval-source-map',
  optimization: {
    minimize: false,
    usedExports: true,
  },
  devServer: {
    port: process.env.PORT || 3000,
    hot: true,
    open: true,
    liveReload: true,
    historyApiFallback: true,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
  output: {
    publicPath: '/',
  },
});
