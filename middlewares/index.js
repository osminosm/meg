const fs = require('fs')
const path = require('path')

const middlewares = {}

fs.readdirSync(__dirname)
  .filter(file => file !== 'index.js')
  .map(file => file.replace('.js', ''))
  .forEach(middlewareName => {
    const middleware = require(path.join(__dirname, middlewareName))
    middlewares[middlewareName] = middleware
  })

module.exports = middlewares