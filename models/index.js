const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const { db } = require('../utils/config')

const models = {}

const sequelize = new Sequelize(
  db.dbname,
  db.username,
  db.password,
  db.options
)

fs.readdirSync(__dirname)
  .filter(file => file !== 'index.js')
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file))
    models[model.name] = model
  })

models.sequelize = sequelize
models.Sequelize = Sequelize

module.exports = models