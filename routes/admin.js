const router = require('express').Router()
const adminController = require('../controllers/admin')

router.get('/blog', adminController.blogPostsPage)
router.get('/blog/post', adminController.postEditorPage)
router.get('/blog/post/:postSlug', adminController.postEditorPage)

router.get('/settings', adminController.siteOptions)

module.exports = router