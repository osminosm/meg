process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
chai.use(chaiHttp);
const fs = require("fs");

const config = require("../../utils/config");
config.db.dbname = "blog_test";
const app = require("../../app");
const { sequelize, User } = require("../../models");

describe("/api", () => {
  beforeEach(done => {
    sequelize
      .sync({ force: true, match: /_test$/, logging: false })
      .then(() => {
        done();
      });
  });
  describe("/api/auth", () => {
    it("should 401 with bad credencials", done => {
      chai
        .request(app)
        .post("/api/auth")
        .send({
          username: "someuser",
          password: "somepass"
        })
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });

    it("should 200 with correct user", done => {
      User.createNew({
        username: "adminuser",
        password: "secretword"
      }).then(user => {
        const accessToken = user.generateToken();
        chai
          .request(app)
          .post("/api/auth")
          .send({
            username: "adminuser",
            password: "secretword"
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property("access_token");
            done();
          });
      });
    });
  });
});
