module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('BlogPost', {
    slug: {
      type: DataTypes.STRING,
      unique: true
    },
    title: {
      type: DataTypes.STRING,
    },
    content: {
      type: DataTypes.TEXT
    },
    published: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  })

  Model.getBySlug = (slug) => sequelize.models.BlogPost.findOne({ where: { slug } })

  Model.updatePost = (post) => sequelize.models.BlogPost.update(post, { where: { id: post.id } })

  Model.deletePost = (id) => sequelize.models.BlogPost.destroy({ where: { id } })


  return Model
}