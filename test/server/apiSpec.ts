import "mocha";
import * as _ from "lodash";
import * as supertest from "supertest";
import * as should from "should";
import db from '../../src/server/database';
import { makeApp } from '../../app';

const app = makeApp(true);

interface API {
  type: string;
  collection: string;
  makeResource: () => any;
  update: any;
}

export function makeSpec(api: API) {
  describe(`${api.collection} API`, () => {
    let resourceId;

    it(`should return 404 on GET /api/${api.type}/0`, (done) => {
      supertest(app)
        .get(`/api/${api.type}/0`)
        .expect(404)
        .end((err, res) => {
          if (err) throw err;
          should(res.body).be.empty;
          done();
        });
    });

    it(`should return 404 on GET /api/${api.type}/z`, (done) => {
      supertest(app)
        .get(`/api/${api.type}/z`)
        .expect(404)
        .end((err, res) => {
          if (err) throw err;
          should(res.body).be.empty;
          done();
        });
    });

    it(`/POST /api/${api.collection}`, (done) => {
      let resource = api.makeResource();
      supertest(app).post(`/api/${api.collection}`)
        .send(resource)
        .expect(200)
        .end((err, res) => {
          if (err) throw err;
          resource = res.body;
          should(resource.id).not.be.null;
          should(resource.id).not.be.empty;
          resourceId = resource.id;
          done();
        });
    });

    it(`/GET and /PUT /api/${api.type}/:id`, (done) => {
      const url = `/api/${api.type}/${resourceId}`;
      supertest(app).get(url)
        .expect(200)
        .end((err, res) => {
          if (err) throw err;

          const resource = res.body;

          should(res.body).not.be.null;
          should(res.body).not.be.empty;

          const updatedResource = Object.assign({}, resource, api.update);

          supertest(app).put(url)
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
      supertest(app).get(`/api/${api.collection}`)
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
      supertest(app).del(`/api/${api.type}/0`)
        .expect(404)
        .end((err, res) => {
          if (err) throw err;
          should(res.body).be.empty;
          done();
        });
    });

    it(`/DELETE /api/${api.type}/z not found`, (done) => {
      supertest(app).del(`/api/${api.type}/z`)
        .expect(404)
        .end((err, res) => {
          if (err) throw err;
          should(res.body).be.empty;
          done();
        });
    });

    it(`/DELETE /api/${api.type}/:id`, (done) => {
      const url = `/api/${api.type}/${resourceId}`;
      supertest(app).del(url)
        .end((err, res) => {
          if (err) throw err;
          should(res.body).be.empty;

          supertest(app).get(url)
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
