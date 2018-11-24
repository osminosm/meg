module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('PageSection', {
    key: {
      type: DataTypes.STRING,
      unique: true
    },
    content: {
      type: DataTypes.TEXT
    }
  })

  Model.get = (key) => sequelize.models.PageSection.findOne({ where: { key } })

  Model.save = (section) => sequelize.models.PageSection.upsert(section)

  return Model
}