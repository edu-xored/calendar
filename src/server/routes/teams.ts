import * as express from 'express';
import * as teamsStore from "./../storages/teamsStore";
import { Team } from '../../lib/model';

const router = express.Router();

router.post('/teams', (req, res) => {
    teamsStore.create(req.body)
        .then((result) => {
            res.json(result);
        })
        .catch((error) => {
            res.json(error);
        });
});

router.get('/teams', (req, res) => {
    teamsStore.getAll()
        .then((result) => {
            res.json(result);
        })
        .catch((error) => {
            res.json(error);
        });
});

router.get('/team/:id', (req, res) => {
    teamsStore.getById(req.params.id)
        .then((result) => {
            res.json(result);
        })
        .catch((error) => {
            res.json(error);
        });
});

router.delete('/team/:id', (req, res) => {
    teamsStore.removeById(req.params.id)
        .then((result) => {
            res.json(result);
        })
        .catch((error) => {
            res.json(error);
        });
});