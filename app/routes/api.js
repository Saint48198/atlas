var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Country = mongoose.model('Country');

module.exports = function (app, atlasDb) {
  app.use('/', router);
};

router.get('/api/:type', function (req, res, next) {
  var apiType = req.params.type ? req.params.type.toLowerCase() : "";
  var id = req.query.id;
  var region = req.query.region;
  var query = req.query.query;
  var queryValue = {};
  var json = { resp: [] };
  res.setHeader('Content-Type', 'application/json');

  switch (apiType) {
    case "country":
      if (id !== undefined || region !== undefined) {
        if (id !== undefined) {
          queryValue.id = id;
        } else {
          queryValue.region = region;
        }

        Country.find(queryValue, function (err, countries) {
          if (!err) {
            json.resp = countries;
          } else {
            json.error = err;
          }
          res.send(JSON.stringify(json, null, 3));
        });
      } else if (query !== undefined) {
        Country.find({ name: new RegExp('^' + query, "i") }, function (err, countries) {
          if (!err) {
            json.resp = countries;
          } else {
            json.error = err;
          }
          res.send(JSON.stringify(json, null, 3));
        });
      } else {
        Country.find(function (err, countries) {
          if (!err) {
            json.resp = countries;
          } else {
            json.error = err;
          }
          res.send(JSON.stringify(json, null, 3));
        });
      }
      break;
    default:
      json.error = "No API type found!";
      res.json(JSON.stringify(json, null, 3))
  }


});
