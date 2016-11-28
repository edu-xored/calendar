import "mocha";
import * as supertest from "supertest";
import * as should from "should";
import { User } from '../../src/lib/model';
import { makeApp } from '../../app';
import * as _ from 'lodash';

const app = makeApp(true);
const localAuth = '$local_admin';

describe("auth api", () => {
  it("basic test", (done) => {
    supertest(app).post(`/api/users`)
      .set('Authorization', localAuth)
      .send({
        login: 'tempuser',
        name: 'tempuser',
        password: 'tempuser',
      })
      .expect(200)
      .end((err, res) => {
        if (err) throw err;

        const user: User = res.body;
        should(user.pwdhash).be.undefined();

        supertest(app).post('/api/login')
          .send({ username: user.name, password: 'tempuser' })
          .expect(200)
          .end((err, res) => {
            if (err) throw err;

            const token: string = res.body;
            should(token).be.not.empty();
            console.log('token:', token);


            supertest(app).get(`/api/me`)
              .set('Authorization', 'Bearer ' + token)
              .expect(200)
              .end((err, res) => {
                if (err) throw err;

                const me: User = res.body;
                console.log("ActualMe:", me);
                const filter = (user: any) => {
                  return _.pick(user, ["name", "login", "id"]);
                }
                should(filter(me)).is.deepEqual(filter(user));


                supertest(app).delete(`/api/user/${user.id}`)
                  .set('Authorization', 'Bearer ' + token)
                  .expect(200)
                  .end((err, res) => {
                    if (err) throw err;
                    done();
                  });
              });

          });
      });
  });

  it('should respond with 403', (done) => {
    supertest(app).post(`/api/users`)
      .send({
        login: 'batman',
        name: 'batman',
        password: 'batman',
      })
      .expect(403)
      .end((err, res) => {
        if (err) throw err;
        done();
      });
  });
});
