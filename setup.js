const { sequelize, User } = require('./models')


console.log("> Syncing with database...")
sequelize.sync().then(() => {
  // console.log("Clearing Users...")
  // User.truncate().then(() => {
  //   console.log("> Creating User...")
  //   User.createNew({
  //     username: 'admin',
  //     password: 'admin'
  //   }).then(user => {
  //     console.log("> Created user :", user)
  //     User.findAll().then(users => console.log(users))
  //   })
  // })
  User.findAll().then(users => users.map(user => console.log("User >>>> ",user)))
})