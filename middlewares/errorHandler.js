module.exports = {
  renderError: (err, req, res, next) => {
    err = {
      httpCode: err.httpCode || 500,
      message: err.message || "Unknown error"
    }
    if (req.path.indexOf('/api') === 0) {
      res.status(err.httpCode).json(err)
    } else {
      res.status(err.httpCode).render('./pages/error', err)
    }
  },

  renderNotFound: (req, res, next) => {
    const error = {
      httpCode: 404,
      message: "Resource not found"
    }
    if (req.path.indexOf('/api') === 0) {
      res.status(error.httpCode).json(error)
    } else {
      error.message = "Page not found"
      res.status(error.httpCode).render('./pages/error', error)
    }
  }
}