process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../index");
const should = chai.should();

chai.use(chaiHttp);

describe("/api", () => {
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
  });
});
