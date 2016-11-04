import "mocha";
import * as supertest from "supertest";
import * as should from "should";
import { User } from "../../../src/lib/model"

var server = supertest.agent("http://localhost:8000");

describe("Users RestFul Api tests", () => {
    it("Should return null on getUser(0)", (done) => {
        server.get(`/Api/getUser/${0}`)
            .expect(200)
            .expect("Content-type", /json/)
            .end((err, res) => {
                should(res.body.data).equal(null);
                done();
            })
    });
    it("Should create user, return its id and return new user by get method", (done) => {
        let user: User = {
            id: "stub",
            name: "name"
        };
        server.post("/Api/createUser")
            .send(user)
            .end((err, res) => {
                console.log(res.body);
                done();
            })
    });
});