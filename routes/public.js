const router = require('express').Router()
const publicController = require('../controllers/public')


router.get('/', publicController.homePage)

router.get('/blog', publicController.blogPage)
router.get('/blog/:slug', publicController.blogPostPage)

router.get('/contact', publicController.contactPage)

router.get('/login', publicController.loginPage)
router.get('/logout', publicController.logoutRedirect)

module.exports = router