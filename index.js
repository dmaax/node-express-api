const express = require('express');
const API = require('./middleware/apikeys');

const app = express();
const port = process.env.PORT || 3000;

app.get('/v1', API.validateKey, (req, res) => {
    let key = req.query.key;
    let host = req.hostname;
    if (key) {
        res.send({
            status: 'OK!',
            IP: req.ip,
            Host: host,
            Key: key
        });
        return;
    }
    res.send({
        status: 'OK!',
        Key: "Nenhuma chave",
        Host: host
    });
});

app.listen(port, () => {
    console.log(`Server running at port ${port}.`);
});