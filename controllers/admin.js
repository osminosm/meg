const { BlogPost, SiteOptions, PageSection } = require('../models')

module.exports = {

  adminIndex: (req, res) => {
    res.status(302).redirect('/admin/blog')
  },

  editAbout: (req,res, next) =>{
    PageSection.get('about').then(section => {
      res.render('admin/editabout', {
        pageHeader: {
          title: 'Edit about page',
          activeNavigation: 'editabout'
        },
        section
      })
    }).catch(next)
  },

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