import "mocha";
import * as supertest from "supertest";
import * as should from "should";
import {User} from '../../src/lib/model';
import { makeApp } from '../../app';

const app = makeApp(true);
const localAuth = '$local_admin';

interface API {
  type: string;
  collection: string;
  makeResource: () => any;
  update: any;
  addTests?: (ctx: any) => void;
}

function get(url: string) {
  return supertest(app).get(url).set('Authorization', localAuth);
}

function post(url: string) {
  return supertest(app).post(url).set('Authorization', localAuth);
}

function put(url: string) {
  return supertest(app).put(url).set('Authorization', localAuth);
}

function del(url: string) {
  return supertest(app).del(url).set('Authorization', localAuth);
}

export function makeSpec(api: API) {
  const ctx: any = {};

  describe(`${api.collection} API`, () => {
    let resourceId;

    it(`should return 404 on GET /api/${api.type}/0`, (done) => {
      get(`/api/${api.type}/0`)
        .expect(404)
        .end((err, res) => {
          if (err) throw err;
          should(res.body).be.empty;
          done();
        });
    });

    it(`should return 404 on GET /api/${api.type}/z`, (done) => {
      get(`/api/${api.type}/z`)
        .expect(404)
        .end((err, res) => {
          if (err) throw err;
          should(res.body).be.empty;
          done();
        });
    });

    it(`/POST /api/${api.collection}`, (done) => {
      let resource = api.makeResource();
      post(`/api/${api.collection}`)
        .send(resource)
        .expect(200)
        .end((err, res) => {
          if (err) throw err;
          resource = res.body;
          should(resource.id).not.be.null;
          should(resource.id).not.be.empty;
          resourceId = resource.id;
          ctx.resourceId = resourceId;
          done();
        });
    });

    it(`/GET and /PUT /api/${api.type}/:id`, (done) => {
      const url = `/api/${api.type}/${resourceId}`;
      get(url)
        .expect(200)
        .end((err, res) => {
          if (err) throw err;

          const resource = res.body;

          should(res.body).not.be.null;
          should(res.body).not.be.empty;

          const updatedResource = Object.assign({}, resource, api.update);

          put(url)
            .send(updatedResource)
            .expect(200)
            .end((err, res) => {
              if (err) throw err;
              // TODO assert body is changed correctly, compare with updatedResource
              should(res.body).not.be.null;
              should(res.body).not.be.empty;
              done();
            });
        });
    });

    it(`/GET /api/${api.collection}`, (done) => {
      get(`/api/${api.collection}`)
        .expect(200)
        .end((err, res) => {
          if (err) throw err;
          const list: any[] = res.body || [];
          should(list).not.be.empty;
          const it = list.find(u => u.id === resourceId);
          should(it).be.Object();
          done();
        });
    });

    it(`/DELETE /api/${api.type}/0 not found`, (done) => {
      del(`/api/${api.type}/0`)
        .expect(404)
        .end((err, res) => {
          if (err) throw err;
          should(res.body).be.empty;
          done();
        });
    });

    it(`/DELETE /api/${api.type}/z not found`, (done) => {
      del(`/api/${api.type}/z`)
        .expect(404)
        .end((err, res) => {
          if (err) throw err;
          should(res.body).be.empty;
          done();
        });
    });

    // add more tests for given API
    if (api.addTests) {
        api.addTests(ctx);
    }

    it(`/DELETE /api/${api.type}/:id`, (done) => {
      const url = `/api/${api.type}/${resourceId}`;
      del(url)
        .end((err, res) => {
          if (err) throw err;
          should(res.body).be.empty;

          get(url)
            .expect(404)
            .end((err, res) => {
              if (err) throw err;
              should(res.body).be.empty;
              done();
            });
        });
    });
  });
}

makeSpec({
  type: 'user',
  collection: 'users',
  makeResource: () => {
    return {
      id: "1",
      name: "bob"
    };
  },
  update: {name: "rob"},
});

makeSpec({
  type: 'team',
  collection: 'teams',
  makeResource: () => {
    return {
      id: "1",
      name: "super"
    };
  },
  update: {name: "bulls"},
  addTests: (ctx: any) => {
    it('should add/remove members', (done) => {
      const userName = 'batman';
      // add user
      post('/api/users')
        .send({name: userName})
        .expect(200)
        .end((err, res) => {
          if (err) throw err;

          const user: User = res.body;
          should(user.name).be.eql(userName);

          const teamId = ctx.resourceId;

          // add user to the team
          post(`/api/team/${teamId}/members`)
            .send([user.id])
            .expect(200)
            .end((err, res) => {
              if (err) throw err;

              get(`/api/team/${teamId}/members`)
                .expect(200)
                .end((err, res) => {
                  if (err) throw err;

                  should(res.body.length).be.eql(1);
                  should(res.body[0].id).be.eql(user.id);
                  should(res.body[0].name).be.eql(user.name);

                  del(`/api/team/${teamId}/members`)
                    .send([user.id])
                    .expect(200)
                    .end((err, res) => {
                      if (err) throw err;

                      get(`/api/team/${teamId}/members`)
                        .expect(200)
                        .end((err, res) => {
                          if (err) throw err;

                          should(res.body.length).be.eql(0);

                          del(`/api/user/${user.id}`)
                            .expect(200)
                            .end((err, res) => {
                              if (err) throw err;
                              done();
                            });
                        });
                    });
                });
            });
        });
    });
  },
});

makeSpec({
  type: 'calendar',
  collection: 'calendars',
  makeResource: () => {
    return {
      name: 'team calendar',
      type: 'leaves',
      description: 'team leaves',
    };
  },
  update: {type: "absences"},
});

makeSpec({
  type: 'event',
  collection: 'events',
  makeResource: () => {
    return {
      type: 'status',
      comment: 'nothing',
    };
  },
  update: {type: "presence"},
});
