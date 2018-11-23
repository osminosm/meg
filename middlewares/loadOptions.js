const { SiteOptions } = require('../models')

module.exports = (req, res, next) => {
  SiteOptions.getAll()
    .then(options => {
      res.locals.site_options = options
      res.locals.isLoggedIn = !!req.user;
      next()
    })
    .catch(err => {
      next(err)
    })
}