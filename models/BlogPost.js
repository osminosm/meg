module.exports = (sequelize, DataTypes) =>
  sequelize.define('BlogPost', {
    slug: {
      type: DataTypes.STRING,
      unique: true
    },
    title: {
      type: DataTypes.STRING,
    },
    content: {
      type: DataTypes.TEXT
    }
  })