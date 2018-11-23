module.exports = (options) => (req, res, next) => {
  const unless = options ? options.unless || [] : []
  const ignoredRoute = unless.reduce((acc, route) => acc || req.path.indexOf(route) === 0, false)
  if (req.user || ignoredRoute) {
    next()
  } else {
    next({
      httpCode: 403,
      message: 'Forbidden: You can not access this rescource'
    })
  }
}