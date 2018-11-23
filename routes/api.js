const router = require('express').Router()
const apiController = require('../controllers/api')

router.post('/auth', apiController.authenticate)

router.post('/blog/posts', apiController.addPost)

router.post('/options', apiController.saveSiteOptions)

module.exports = router