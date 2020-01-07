/* eslint-disable object-curly-newline */
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');
const pkg = require('./package.json');

const CONFIG = require('./config/config.js');

const NAME_FORMAT = '[name].[ext]';
const IS_PRODUCTION = CONFIG.NODE_ENV === 'production';

const config = {
  mode: CONFIG.NODE_ENV,

  devtool: CONFIG.DEV_TOOLS,

  target: 'web',

  entry: [
    `./config/env/${CONFIG.ENV}/config-web`,
    './src/index',
  ],

  output: {
    path: path.resolve(__dirname, 'public'),
    filename: CONFIG.WITH_HASH ? 'bundle.[hash].js' : 'bundle.js',
    publicPath: '/',
  },

  optimization: {
    minimize: IS_PRODUCTION,
    removeAvailableModules: true,
    removeEmptyChunks: true,
    mergeDuplicateChunks: true,
    occurrenceOrder: true,
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: !IS_PRODUCTION,
            plugins: ['react-hot-loader/babel'],
          },
        },
        exclude: /node_modules/,
        include: __dirname,
      },
      {
        test: /\.svg(\?v=[0-9].[0-9].[0-9])?$/,
        include: [__dirname, /node_modules/],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: NAME_FORMAT,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: !IS_PRODUCTION,
              reloadAll: !IS_PRODUCTION,
            },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: !IS_PRODUCTION,
            },
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: !IS_PRODUCTION,
            },
          },
        ],
      },
      {
        test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/,
        use: {
          loader: 'url-loader',
          options: {
            mimetype: 'application/font-woff',
          },
        },
      },
      {
        test: /\.(ttf|eot|gif|pdf)(\?v=[0-9].[0-9].[0-9])?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: NAME_FORMAT,
          },
        },
      },
      {
        test: /\.(jpe?g|png|)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: NAME_FORMAT,
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              optipng: {
                optimizationLevel: 5,
              },
              pngquant: {
                quality: '75-90',
                speed: 3,
              },
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(CONFIG.NODE_ENV),
        BABEL_ENV: JSON.stringify(CONFIG.BABEL_ENV),
      },
    }),
    new MiniCssExtractPlugin({
      filename: CONFIG.WITH_HASH ? 'styles.[hash].css' : 'styles.css',
    }),
    new HtmlWebpackPlugin({
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: false,
        html5: true,
        minifyCSS: IS_PRODUCTION,
        minifyJS: IS_PRODUCTION,
        removeComments: IS_PRODUCTION,
        removeEmptyAttributes: true,
      },
      title: pkg.description,
      filename: 'index.html',
      template: 'src/index.html.template',
      version: pkg.version,
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new CompressionPlugin({
      cache: false,
    }),
  ],

  resolve: {
    extensions: ['.js'],
  },

  stats: {
    children: false,
  },
};

module.exports = config;
