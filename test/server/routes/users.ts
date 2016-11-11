import "mocha";
import * as supertest from "supertest";
import * as should from "should";
import { User } from "../../../src/lib/model"

var server = supertest.agent("http://localhost:8000");
let userId;

describe("Users RestFul Api tests", () => {
    it("Should return null on getUser(0)", (done) => {
        server.get(`/Api/user/${0}`)
            .expect(200)
            .expect("Content-type", /json/)
            .end((err, res) => {
                should(res.body).equal(null);
                should(res.status).equal(404);
                done();
            });             
    });

    it("Should create new user and return him", (done) => {
        let user: User = {
            id: "stub",
            name: "name"
        };
        server.post("/Api/createUser")
            .send(user)
            .end((err, res) => {
                user = res.body;
                should(user.id).not.equal(null);
                userId = user.id;
                done();
            });
        
    });

    it("Should get created user from previous test", (done) => {
        server.get(`/Api/user/${userId}`)
            .end((err, res) => {
                should(res.body).not.equal(null);
                done();
            });
    });

    it("Should get all users list, contains new user", (done) => {
        server.get("/Api/users")
            .end((err, res) => {
                let usersList: User[] = res.body;
                should(usersList).not.empty();
                should(usersList.find((u) => {
                    return u.id == userId;
                })).not.equal(undefined);
                done();
            });
    });
});