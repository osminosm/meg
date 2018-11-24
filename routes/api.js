const router = require('express').Router()
const apiController = require('../controllers/api')

router.post('/auth', apiController.authenticate)

router.post('/blog/posts', apiController.addPost)
router.put('/blog/posts', apiController.editPost)
router.delete('/blog/posts', apiController.deletePost)

router.post('/pagesections', apiController.setPageSection)

router.post('/options', apiController.saveSiteOptions)

module.exports = router