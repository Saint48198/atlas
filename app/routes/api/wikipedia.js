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
  const url = 'https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles=' + queryVal;

  if (queryVal) {
    request(url, (error, response, body) => {
      let data = { resp: { error: error } };
      let extract = "";
      let resp = {};
      let index = 0;

      if (!error && response.statusCode == 200) {
        resp = JSON.parse(body)['query']['pages'];
        for (var key in resp) {
          if (index  === 0) {
            extract = resp[key]['extract'];
          }
          index++;
        }

        data.resp = extract;
      }


      res.send(JSON.stringify(data, null, 3));
    });
  }
});
