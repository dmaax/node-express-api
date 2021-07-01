const express = require('express');
const API = require('./api.js');

const app = express();
const port = process.env.PORT || 3000;

app.get('/v1', (req, res) => {
    res.send({status: 'OK!', IP: req.ip});
});

app.listen(port, () => {
    console.log(`Server running at port ${port}.`);
});
