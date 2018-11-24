const { BlogPost, PageSection } = require('../models')
const { tokenCookieName } = require('../utils/config')

module.exports = {

  homePage: (req, res, next) => {
    PageSection.get('about').then(aboutSection => {
      if (!aboutSection) aboutSection = {
        content: ''
      }
      res.render('pages/home', {
        pageHeader: {
          title: 'About',
          activeNavigation: 'home'
        },
        aboutSection
      })
    }).catch(next)
  },

  blogPage: (req, res, next) => {
    BlogPost.findAll().then(blogPosts => {
      res.render('pages/blog', {
        items: blogPosts,
        pageHeader: {
          title: 'Blog',
          activeNavigation: 'blog'
        }
      })
    }).catch(err => {
      next(err)
    })

  },

  blogPostPage: (req, res) => {

    BlogPost.findOne({ where: { slug: req.params.slug } }).then(post => {
      if (post) {
        res.render('pages/blogpost', {
          pageHeader: {
            title: post.title,
            activeNavigation: 'blog'
          },
          post
        })
      } else {
        res.set('Content-Type', 'text/html')
        res.status(404).send(new Buffer('<h2>404 Not Found</h2>'))
      }
    }).catch(err => { next(err) })

  },

  contactPage: (req, res) => {
    res.render('pages/contact', {
      pageHeader: {
        title: 'Contact',
        activeNavigation: 'contact'
      }
    })
  },

  loginPage: (req, res) => {
    if (req.user) {
      res.status(302).redirect('/')
    } else {
      res.render('pages/login', {
        pageHeader: {
          title: 'About',
          activeNavigation: null
        }
      })
    }
  },

  logoutRedirect: (req, res) => {
    res.clearCookie(tokenCookieName)
    res.status(302).redirect('/login')
  }

}