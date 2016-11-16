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
      supertest(app)
        .post(`/api/${api.collection}`)
        .send(resource)
        .end((err, res) => {
          if (err) throw err;
          resource = res.body;
          should(resource.id).not.be.null;
          should(resource.id).not.be.empty;
          resourceId = resource.id;
          done();
        });
    });

    it(`/GET /api/${api.type}/:id`, (done) => {
      supertest(app)
        .get(`/api/${api.type}/${resourceId}`)
        .end((err, res) => {
          if (err) throw err;
          should(res.body).not.be.null;
          done();
        });
    });

    it(`/GET /api/${api.collection}`, (done) => {
      supertest(app)
        .get(`/api/${api.collection}`)
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
      supertest(app)
        .del(`/api/${api.type}/0`)
        .end((err, res) => {
          if (err) throw err;
          should(res.body).be.empty;
          done();
        });
    });

    it(`/DELETE /api/${api.type}/z not found`, (done) => {
      supertest(app)
        .del(`/api/${api.type}/z`)
        .end((err, res) => {
          if (err) throw err;
          should(res.body).be.empty;
          done();
        });
    });

    it(`/DELETE /api/${api.type}/:id`, (done) => {
      const url = `/api/${api.type}/${resourceId}`;
      supertest(app)
        .del(url)
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
  }
});

makeSpec({
  type: 'team',
  collection: 'teams',
  makeResource: () => {
    return {
      id: "1",
      name: "super"
    };
  }
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
  }
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
});
