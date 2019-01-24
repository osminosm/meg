process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
let app = require("../../index");
let should = chai.should();

const { sequelize } = require("../../models");

chai.use(chaiHttp);

describe("/api", () => {

  it("GET /api/ should 403", done => {
    chai
      .request(app)
      .get("/api")
      .end((err, res) => {
        res.should.have.status(403);
        done();
      });
  });
});

