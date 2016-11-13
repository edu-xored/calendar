import "mocha";
import * as supertest from "supertest";
import * as should from "should";
import { makeApp } from '../../../app';
import { User } from "../../../src/lib/model";

const app = makeApp();
let userId;

describe("Users API", () => {
  it("should return 404 on GET /api/user/0", (done) => {
    supertest(app)
      .get(`/api/user/0`)
      .expect(404)
      .end((err, res) => {
        if (err) throw err;
        should(res.body).be.eql({});
        done();
      });
  });

  it("should create new user and return him", (done) => {
    let user: User = {
      id: "stub",
      name: "name"
    };
    supertest(app)
      .post("/api/users")
      .send(user)
      .end((err, res) => {
        if (err) throw err;
        user = res.body;
        should(user.id).not.be.null;
        should(user.id).not.be.empty;
        userId = user.id;
        done();
      });
  });

  it("should get created user from previous test", (done) => {
    supertest(app)
      .get(`/api/user/${userId}`)
      .end((err, res) => {
        if (err) throw err;
        should(res.body).not.be.null;
        done();
      });
  });

  it("should get all users list, contains new user", (done) => {
    supertest(app)
      .get("/api/users")
      .end((err, res) => {
        if (err) throw err;
        const users: User[] = res.body;
        should(users).not.be.empty;
        const user = users.find(u => u.id === userId);
        should(user).be.Object();
        done();
      });
  });
});
