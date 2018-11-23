const { BlogPost, SiteOptions, User } = require('../models')
const { tokenCookieName } = require('../utils/config')

module.exports = {

  authenticate: (req, res, next) => {
    const { username, password } = req.body
    User.getByUsername(username)
      .then(user => {
        if (user && user.matchPassword(password)) {
          const { access_token } = user.generateToken()
          res
            .cookie(tokenCookieName, access_token)
            .status(200)
            .json({ access_token })
        } else {
          next({ httpCode: 401, success: false, error: 'auth_error', message: 'Invalid credencials' })
        }
      })
      .catch(err => next(err))

  },

  addPost: (req, res, next) => {
    BlogPost.create(req.body)
      .then((post) => {
        res.status(201).json(post)
      })
      .catch((err) => {
        next({ httpCOde: 400, success: false, error: err, message: 'Could not create blog post' })
      })
  },

  saveSiteOptions: (req, res, next) => {
    SiteOptions.save(req.body)
      .then(() => {
        res.status(200).json({ success: true })
      })
      .catch(err => {
        next({ httpCode: 400, success: false, error: err, message: 'Could not save options' })
      })
  }

}