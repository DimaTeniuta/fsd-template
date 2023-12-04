const { EnvironmentPlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
require('dotenv').config();

module.exports = {
  entry: {
    app: './src/index.tsx',
  },
  plugins: [
    new EnvironmentPlugin([]),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new ForkTsCheckerWebpackPlugin(),
    new ESLintPlugin({
      emitError: true,
      emitWarning: true,
      failOnError: true,
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        loader: 'esbuild-loader',
        exclude: /node_modules/,
        options: {
          target: 'es2015',
        },
      },
      {
        test: /\.(png|jpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
      {
        test: /\.(woff|woff2|eof|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack', 'url-loader'],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/i,
        exclude: /\.module\.scss$/i,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                mode: 'icss',
              },
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.module\.scss$/i,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                mode: 'local',
              },
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    symlinks: false,
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    plugins: [new TsconfigPathsPlugin()],
    modules: ['node_modules'],
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
    },
  },
};
