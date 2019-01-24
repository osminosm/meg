const express = require("express");
const { sequelize } = require("./models");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const {
  loadOptions,
  protected,
  configureJwt,
  configureCors,
  errorHandler
} = require("./middlewares");
const { host, port, isTest } = require("./utils/config");

const app = express();

app.engine("html", require("ejs").renderFile);
app.set("views", "./views");
app.set("view engine", "html");

app.use(morgan("dev", { skip: () => isTest }));
app.use(helmet());
app.use(configureCors());
app.use(cookieParser());
app.use(configureJwt());
app.use(bodyParser.json());
app.use(compression());

app.use("/", loadOptions, require("./routes/public"));
app.use("/admin", protected(), loadOptions, require("./routes/admin"));
app.use("/api", protected({ unless: ["/auth"] }), require("./routes/api"));
app.use("/assets", express.static("assets"));

app.use(errorHandler.renderError);
app.use(errorHandler.renderNotFound);

sequelize.sync().then(() => {
  app.listen(port, host, () => {
    console.log(`Server started listening on ${host}:${port}`);
  });
});

module.exports = app;
