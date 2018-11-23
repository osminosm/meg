const args = require('node-args')
const _ = require('lodash')
const fs = require('fs')

const defaultConfig = require('./config-default.json')

let config = defaultConfig
if (args.configFile) {
  if (fs.existsSync(args.configFile)) {
    try {
      const extConfig = JSON.parse(fs.readFileSync(args.configFile))
      if (typeof extConfig.db !== 'undefined') delete config.db
      config = _.merge(config, extConfig)
    } catch (e) {
      console.log("SERVER FAULT: could not parse external config file. exiting...")
      process.exit(1)
    }
  } else {
    console.log("SERVER FAULT: could not find external config file. exiting...")
    process.exit(1)
  }
}

module.exports = config