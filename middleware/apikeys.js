const mysql = require('mysql');

var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "dmaax",
  password: "dmaaxapitoor",
  database: "nodedb"
});

const validateKey = (req, res, next) => {
  //Where is the API key expected to be?
  let api_key = req.query.key; //version 1 with the querystring
  //let api_key = req.params.apikey; //version 2 with the URL params
  //let api_key = req.header('x-api-key'); //version 3 using a header
  con.connect(function (err) {
    //if (err) throw err;
    con.query("SELECT * FROM valid_keys WHERE key_text = ? ", [api_key], function (err, result, fields) {
      //if (err) throw err;
      if (result) {
        console.log('Good API call');
        next();
      } else {
        res.status(403).send({
          error: {
            code: 403,
            message: 'You not allowed.'
          }
        });
      }
    });
  });
  // find() returns an object or undefined
};

module.exports = validateKey;