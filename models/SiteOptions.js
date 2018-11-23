module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('SiteOptions', {
    key: {
      type: DataTypes.STRING,
      unique: true
    },
    value: {
      type: DataTypes.STRING,
    }
  })
  Model.getAll = () => new Promise((resolve, reject) => {
    sequelize.models.SiteOptions.findAll().then(options => {
      const combined = {}
      options.forEach(option => {
        combined[option.key] = option.value
      })
      resolve(combined)
    }).catch(err => reject(err))
  })

  Model.save = (options) => {
    const queries = Object.keys(options).map(key => sequelize.models.SiteOptions.upsert({
      key,
      value: options[key]
    }))
    return Promise.all(queries)
  }
  return Model
}