'use strict'

const path = require('path')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  resolve: function (dir) {
    return path.join(__dirname, '..', dir)
  },

  assetsPath: function (_path) {
    const assetsSubDirectory = 'static'
    return path.posix.join(assetsSubDirectory, _path)
  },

  getEntries: function (globPath) {
    const entries = {}
    
    glob.sync(globPath).forEach(entry => {
      let basename = path.basename(entry, path.extname(entry))
      let tmp = entry.split('/')
      tmp.splice(0, 2)
      tmp.splice(-1)
      tmp.length === 0 ? tmp.push(basename): tmp.push('/', basename)
      let pathname = tmp.join('')
      entries[pathname] = entry
    })
    
    return entries
  },

  transTemplate: function() {
    let arr = []
    let pages = this.getEntries('./src/**/*.ejs')
    for (let pathname in pages) {
        // html page config
        arr.push(new HtmlWebpackPlugin({
            filename: pathname + '.html',
            template: `ejs-loader!${pages[pathname]}`,
            inject: 'body',
            chunksSortMode: function (a, b) {
              let orders = ['polyfill', 'vendor', 'common', pathname]
              let order1 = orders.indexOf(a.names[0])
              let order2 = orders.indexOf(b.names[0])
              return order1 - order2
            },
            chunks: ['polyfill', 'vendor', 'common', pathname] // every html referenced js module
        }))
    }
    return arr
  }

}
