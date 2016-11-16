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

function makeErrorHandler(req: express.Request, res: express.Response) {
  return err => {
    console.log(`${req.method} ${req.path} failed: ${err}`);
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
    const errorHandler = makeErrorHandler(req, res);
    api.orm.findAll({
      logging: console.log,
    }).then(makeResultHandler(res), errorHandler);
  });

  router.get(`/${api.resourceName}/:id`, (req, res) => {
    const id = +req.params.id;
    if (isNaN(id)) {
      res.sendStatus(404);
      return;
    }

    const errorHandler = makeErrorHandler(req, res);

    api.orm.findById(id, {
      logging: console.log,
    }).then(val => {
      console.log(val);
      if (val) {
        res.json(val);
      } else {
        res.sendStatus(404);
      }
    }, errorHandler);
  });

  // create operation
  router.post(`/${api.collectionName}`, (req, res) => {
    const resultHandler = makeResultHandler(res);
    const errorHandler = makeErrorHandler(req, res);

    const data = api.makeResource(req.body);
    data.id = null;

    api.orm.create(data, {
      logging: console.log,
    }).then(resultHandler, errorHandler);
  });

  // update operation
  router.put(`/${api.resourceName}/:id`, (req, res) => {
    const id = +req.params.id;
    if (isNaN(id)) {
      res.sendStatus(404);
      return;
    }

    const resultHandler = makeResultHandler(res);
    const errorHandler = makeErrorHandler(req, res);

    const data = api.makeResource(req.body);

    api.orm.findById(id, {
      logging: console.log,
    }).then((d: any) => {
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
    const id = +req.params.id;
    if (isNaN(id)) {
      res.sendStatus(404);
      return;
    }

    const errorHandler = makeErrorHandler(req, res);
    const send200 = makeStatus200Handler(res);

    api.orm.findById(id, {
      logging: console.log,
    }).then((d: any) => {
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
