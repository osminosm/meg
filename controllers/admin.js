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

  postEditorPage: (req, res, next) => {
    const { postSlug } = req.params
    if (postSlug) {
      BlogPost.getBySlug(postSlug).then((post) => {
        if (post) { renderPostEditor(res, post) }
        else next({ httpCode: 404, message: 'Blog Post not found' });
      })
    } else {
      renderPostEditor(res)
    }
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

const renderPostEditor = (res, post) => {
  res.render('admin/blogpost', {
    pageHeader: {
      title: post ? 'Edit post' : 'Add new post',
      activeNavigation: 'blog'
    },
    post
  })
}