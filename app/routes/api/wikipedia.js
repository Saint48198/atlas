"use strict";

var express = require('express');
var request = require('request');
var router = express.Router();


module.exports = function (app) {
  app.use('/', router);
};

router.get('/api/wikipedia', (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  const queryVal = req.query.name;
  const url = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=' + queryVal;

  if (queryVal) {
    request(url, (error, response, body) => {
      let data = { resp: { error: error } };

      if (!error && response.statusCode == 200) {
        data.resp = JSON.parse(body);
      }

      res.send(JSON.stringify(data, null, 3));
    });
  }
});
