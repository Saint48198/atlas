var express  = require('express');
var _        = require('lodash');
var mongoose = require('mongoose');
var router   = express.Router();
var Country  = mongoose.model('Country');


module.exports = function (app, atlasDb) {
  app.use('/', router);
};

router.get('/api/country', function (req, res, next) {
  var id = req.query.id;
  var region = req.query.region;
  var code = req.query.code;
  var query = req.query.query;
  var queryValue = {};
  var json = { resp: [] };
  res.setHeader('Content-Type', 'application/json');


  console.log();

  if (!_.isUndefined(id) || !_.isUndefined(region) || !_.isUndefined(code)) {
    if (!_.isUndefined(id)) {
      queryValue.id = id;
    } else if(!_.isUndefined(region)) {
      queryValue.region = region;
    } else {
      queryValue.code2 = code;
    }

    Country.find(queryValue, function (err, countries) {
      if (!err) {
        json.resp = countries;
      } else {
        json.error = err;
      }
      res.send(JSON.stringify(json, null, 3));
    });
  } else if (!_.isUndefined(query)) {
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
});
