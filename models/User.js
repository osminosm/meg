const bcrypt = require('bcrypt')
const { bcryptSaltWorkFactor, jwtSecret, jwtUserExpiresIn } = require('../utils/config')
const jwt = require('jsonwebtoken')

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
    }
  })

  Model.getByUsername = (username) => sequelize.models.User.findOne({ where: { username }, attributes: ['username', 'password', 'createdAt', 'updatedAt'] })

  Model.createNew = (user) => {
    const salt = bcrypt.genSaltSync(bcryptSaltWorkFactor)
    const hash = bcrypt.hashSync(user.password, salt)
    user.password = hash
    return sequelize.models.User.create(user)
  }

  Model.prototype.matchPassword = function (candidatePassword) {
    return bcrypt.compareSync(candidatePassword, this.password)
  }

  Model.prototype.generateToken = function () {
    const user = this
    delete user.password
    return {
      access_token: jwt.sign({ sub: user.username }, jwtSecret, { expiresIn: jwtUserExpiresIn })
    }
  }

  return Model
}