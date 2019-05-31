'use strict'

const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const WebpackMd5Hash = require('webpack-md5-hash')
const CleanPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const utils = require('./utils')

module.exports = merge(baseConfig, {
    mode: 'production',
    
    devtool: 'source-map',

    stats: { children: false },

    output: {
      path: utils.resolve('dist'),
      filename: '[name].[chunkhash].js'
    },

    optimization: {
        minimizer: [
            new UglifyJsPlugin({
              cache: true,
              parallel: true,
              uglifyOptions: {
                compress: {
                  'drop_console': true
                },
                ecma: 5,
                warnings: false,
                mangle: true,
                output: {
                  comments: false,
                  beautify: false
                }
              },
              sourceMap: false
            }),
            new OptimizeCssAssetsPlugin({})
        ],
        // Webpack4 removes the commonchunkplugin and uses the `common-chunk-and-vendor-chunk` configuration as follows
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all',
                    priority: -1,
                    enforce: true
                },
                common: {
                    test: /[\\/]src[\\/]/,
                    name: 'common',
                    chunks: 'initial',
                    minChunks: 2,
                    priority: -10,
                    maxInitialRequests: 5,
                    minSize: 0
                }
            }
        }
    },

    plugins: [
      new CleanPlugin([utils.resolve('dist')]),
      new CopyWebpackPlugin([{ 
        from: utils.resolve('src/shared/assets'), 
        to: utils.resolve('dist/assets')
      }]),
      new ExtractTextPlugin({
          filename: '[name].[chunkhash].css'
      }),
      new WebpackMd5Hash()
    ],

})
