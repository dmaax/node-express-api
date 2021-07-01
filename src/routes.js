const express = require('express');

const routes = express.Router();

routes.get('/v1', (req, res) => {
    return res.json({ Status: 'OK'});
});

module.exports = routes;