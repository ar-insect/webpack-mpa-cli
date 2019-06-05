'use strict'

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const utils = require('./utils')

module.exports = {
    resolve: {
        extensions: ['.js', '.scss', '.json'],
        modules: [
            utils.resolve('src'),
            'node_modules'
        ]
    },

    module: {
        rules: [
            // babel
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            // ejs template
            {
                test: /\.ejs$/,
                loader: 'ejs-html-loader',
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: require.resolve('jquery'),
                loader: 'exports-loader?window.jQuery!script-loader'
            },
            {
                test: /\.(woff|svg|eot|ttf)\??.*$/,
                use: ['url-loader']
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: ['url-loader?limit=8192&name=images/[hash:8].[name].[ext]']
            },
            {
                test: /\.(scss|css)$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { 
                            loader: 'css-loader', 
                            options: { sourceMap: true } 
                        },
                        {
                            loader: 'sass-loader', options: {
                                sourceMap: true,
                                paths: [
                                    utils.resolve('node_modules'),
                                    utils.resolve('src/shared/styles')
                                ]
                            }
                        }
                    ]
                }),
            },
        ]
    },

    plugins: [
        ...utils.transTemplate(),
        new CopyWebpackPlugin([{ 
            from: utils.resolve('src/shared/assets'), 
            to: utils.resolve('dist/assets')
        }]),
    ],
    // multi pages entries
    entry: utils.getEntries('./src/**/*.js'),
    
}
