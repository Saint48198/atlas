var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Region = mongoose.model('Region');

module.exports = function (app, atlasDb) {
  app.use('/', router);
};

router.get('/api/region', function (req, res, next) {
  var id = req.query.id;
  var code = req.query.code;
  var queryValue = {};
  var json = { resp: [] };
  res.setHeader('Content-Type', 'application/json');

  if (id !== undefined) {
    queryValue.id = id;

    Region.find(queryValue, function (err, regions) {
      if (!err) {
        json.resp = regions;
      } else {
        json.error = err;
      }
      res.send(JSON.stringify(json, null, 3));
    });
  } else if (code != undefined){
    queryValue.code = code;
    console.log(code);
    Region.find(queryValue, function (err, regions) {
      if (!err) {
        json.resp = regions;
      } else {
        json.error = err;
      }
      res.send(JSON.stringify(json, null, 3));
    });
  } else {
    Region.find(function (err, regions) {
      if (!err) {
        json.resp = regions;
      } else {
        json.error = err;
      }
      res.send(JSON.stringify(json, null, 3));
    });
  }
});
