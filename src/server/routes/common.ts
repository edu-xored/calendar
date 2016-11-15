import * as _ from 'lodash';
import * as ORM from "sequelize";
import * as express from "express";

interface API<T> {
  orm: ORM.Model<T, any>;
  collectionName: string;
  resourceName: string;
  makeResource?: (payload: any) => any;
}

function makeResultHandler(res: express.Response) {
  return value => {
    res.json(value);
  };
}

function makeStatus200Handler(res: express.Response) {
  return d => {
    res.sendStatus(200);
  };
}

function makeErrorHandler(res: express.Response) {
  return err => {
    res.json({error: err});
  };
}

export function makeRouter<T>(api: API<T>) {
  if (!api.makeResource) {
    api.makeResource = _.identity;
  }

  const router = express.Router();

  // read operations
  router.get(`/${api.collectionName}`, (req, res) => {
    api.orm.findAll().then(makeResultHandler(res), makeErrorHandler(res));
  });

  router.get(`/${api.resourceName}/:id`, (req, res) => {
    const id = +req.params.id;
    if (isNaN(id)) {
      res.sendStatus(404);
      return;
    }
    api.orm.findById(id).then(val => {
      if (val) {
        res.json(val);
      } else {
        res.sendStatus(404);
      }
    }, makeErrorHandler(res));
  });

  // create operation
  router.post(`/${api.collectionName}`, (req, res) => {
    const errorHandler = makeErrorHandler(res);

    const data = api.makeResource(req.body);
    data.id = null;
    api.orm.create(data).then(makeResultHandler(res)).catch(errorHandler);
  });

  // update operation
  router.put(`/${api.resourceName}/:id`, (req, res) => {
    const data = api.makeResource(req.body);

    const resultHandler = makeResultHandler(res);
    const errorHandler = makeErrorHandler(res);

    api.orm.findById(+req.params.id).then((d: any) => {
      const val: ORM.Instance<any> = d;
      if (!val) {
        res.sendStatus(404);
        return;
      }
      val.update(data).then(resultHandler, errorHandler);
    }, errorHandler);
  });

  // delete operation
  router.delete(`/${api.resourceName}/:id`, (req, res) => {
    const errorHandler = makeErrorHandler(res);
    const send200 = makeStatus200Handler(res);

    api.orm.findById(+req.params.id).then((d: any) => {
      const val: ORM.Instance<any> = d;
      if (val) {
        val.destroy().then(send200, errorHandler);
      } else {
        res.sendStatus(404);
      }
    }, errorHandler);
  });

  return router;
}
