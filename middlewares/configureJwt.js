const jwt = require('express-jwt')
const { jwtSecret } = require('../utils/config')

module.exports = () => jwt({
  secret: jwtSecret,
  getToken: req => {
    const bearerAuthHeader = req.headers.Authorization && req.headers.Authorization.split(' ')[0] === 'Bearer'
    const bearerAuthCookie = req.cookies.access_token
    return bearerAuthHeader ?
      bearerAuthHeader :
      bearerAuthCookie ?
        bearerAuthCookie : null
  },
  credentialsRequired: false
})