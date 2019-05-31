'use strict'

const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const baseConfig = require('./webpack.config.base')

const HOST = 'localhost'
const PORT = 8888

module.exports = merge(baseConfig, {
    mode: 'development',

    devtool: 'cheap-module-source-map',

    output: {
        filename: '[name].js'
    },

    devServer: {
        clientLogLevel: 'warning',
        hot: true,
        contentBase: '../src',
        compress: true,
        host: HOST,
        port: PORT,
        open: true,
        overlay: { warnings: false, errors: true },
        publicPath: '/',
        quiet: true
    },

    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css'
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
})

