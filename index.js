const app = require("./app");
const { host, port } = require("./utils/config");

const { sequelize } = require("./models");

sequelize.sync().then(() => {
  app.listen(port, host, () => {
    console.log(`Server started listening on ${host}:${port}`);
  });
});
