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
          if (!_.isEmpty(res.body)) {
            console.log(res.body);
          }
          should(res.body).be.eql({});
          done();
        });
    });

    it(`should return 404 on GET /api/${api.type}/z`, (done) => {
      supertest(app)
        .get(`/api/${api.type}/z`)
        .expect(404)
        .end((err, res) => {
          if (err) throw err;
          if (!_.isEmpty(res.body)) {
            console.log(res.body);
          }
          should(res.body).be.eql({});
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
          const list: any[] = res.body;
          should(list).not.be.empty;
          const it = list.find(u => u.id === resourceId);
          should(it).be.Object();
          done();
        });
    });
  });
}

db.sequelize.sync();

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

/**
makeSpec({
  type: 'calendar',
  collection: 'calendars',
  makeResource: () => {
    return {
      name: 'team calendar',
      type: 'absences',
      description: 'team absences',
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
*/
