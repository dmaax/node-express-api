const express = require('express');
const KeyController = require('./controllers/KeyController');
const UserController = require('./controllers/UserController');

const routes = express.Router();

routes.get('/v1', (req, res) => {
    return res.json({ Status: 'OK'});
});

routes.get('/v1/users', UserController.index);
routes.get('/v1/users/:id', UserController.index)
routes.get('/v1/keys', KeyController.index);
routes.post('/v1/key', KeyController.store);
routes.post('/v1/users', UserController.store);

module.exports = routes;