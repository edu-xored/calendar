import * as _ from 'lodash';
import * as ORM from "sequelize";
import * as express from "express";

const withLog = { logging: console.log };

interface API<T> {
  orm: ORM.Model<T, any>;
  collectionName: string;
  resourceName: string;
  makeResource?: (payload: any) => any;
  filter?: (data: any) => any;
}

export function makeResultHandler(res: express.Response) {
  return value => {
    res.json(value);
  };
}

function makeStatus200Handler(res: express.Response) {
  return d => {
    res.sendStatus(200);
  };
}

export function makeErrorHandler(req: express.Request, res: express.Response) {
  return err => {
    console.log(`${req.method} ${req.path} failed: ${err}`);
    res.status(500).json({ error: err });
  };
}

export function makeRouter<T>(api: API<T>) {
  if (!api.makeResource) {
    api.makeResource = _.identity;
  }
  if (!api.filter) {
    api.filter = _.identity;
  }

  const router = express.Router();

  // read operations
  router.get(`/${api.collectionName}`, (req, res) => {
    const errorHandler = makeErrorHandler(req, res);
    api.orm.findAll(withLog).then(list => {
      list = _.map(list || [], (t: any) => t.toJSON()).filter(api.filter);
      res.json(list);
    }, errorHandler);
  });

  router.get(`/${api.resourceName}/:id`, (req, res) => {
    const id = +req.params.id;
    if (isNaN(id)) {
      res.sendStatus(404);
      return;
    }

    const errorHandler = makeErrorHandler(req, res);

    api.orm.findById(id, withLog).then((d: any) => {
      if (d) {
        res.json(api.filter(d.toJSON()));
      } else {
        res.sendStatus(404);
      }
    }, errorHandler);
  });

  // create operation
  router.post(`/${api.collectionName}`, (req, res) => {
    const errorHandler = makeErrorHandler(req, res);

    const data = api.makeResource(req.body);
    data.id = null;

    api.orm.create(data, withLog).then((d: any) => {
      res.json(api.filter(d.toJSON()));
    }, errorHandler);
  });

  // common code for update/delete operations
  function makeModelHandler(handler: (req: express.Request, res: express.Response, val: ORM.Instance<T>) => void) {
    return (req: express.Request, res: express.Response) => {
      const id = +req.params.id;
      if (isNaN(id)) {
        res.sendStatus(404);
        return;
      }

      const errorHandler = makeErrorHandler(req, res);

      api.orm.findById(id, withLog).then((d: any) => {
        const val: ORM.Instance<T> = d;
        if (!val) {
          res.sendStatus(404);
          return;
        }
        handler(req, res, val);
      }, errorHandler);
    };
  }

  // update operation
  const updateHandler = makeModelHandler((req, res, val) => {
    const errorHandler = makeErrorHandler(req, res);
    const data = api.makeResource(req.body);
    val.update(data).then((d: any) => {
      res.json(api.filter(d.toJSON()));
    }, errorHandler);
  });

  router.put(`/${api.resourceName}/:id`, updateHandler);

  // delete operation
  const deleteHandler = makeModelHandler((req, res, val) => {
    const errorHandler = makeErrorHandler(req, res);
    const resultHandler = makeStatus200Handler(res);
    val.destroy().then(resultHandler, errorHandler);
  });

  router.delete(`/${api.resourceName}/:id`, deleteHandler);

  return router;
}
