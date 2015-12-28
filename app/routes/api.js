var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Country = mongoose.model('Country');

module.exports = function (app, atlasDb) {
  app.use('/', router);
};

router.get('/api/:type', function (req, res, next) {

  var apiType = req.params.type;
  res.setHeader('Content-Type', 'application/json');

  Country.find(function (err, countries) {
    console.log(countries);
  });


  res.send(JSON.stringify({ a: 1 }, null, 3));
});
