const { BlogPost, SiteOptions } = require('../models')

module.exports = {

  blogPostsPage: (req, res, next) => {
    BlogPost.findAll()
      .then(postList => {
        res.render('admin/blogpostlist', {
          pageHeader: {
            title: 'Blog Posts',
            activeNavigation: 'blog'
          },
          postList
        })
      })
      .catch(err => { next(err) })
  },

  postEditorPage: (req, res) => {
    res.render('admin/blogpost', {
      pageHeader: {
        title: 'Add new post',
        activeNavigation: 'blog'
      }
    })
  },

  siteOptions: (req, res) => {
    SiteOptions.getAll().then(options => {
      res.render('admin/settings', {
        pageHeader: {
          title: 'Site Settings',
          activeNavigation: 'settings'
        },
        options
      })
    }).catch(err => { next(err) })
  }

}