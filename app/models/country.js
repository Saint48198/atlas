// country model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var CountrySchema = new Schema({
  id: Number,
  name: String,
  code2: String,
  code3: String,
  num: Number,
  region: Number
});

//id: 0, name: "Afghanistan", code2: "AF", code3: "AFG", num: 004, region: 034

CountrySchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('Country', CountrySchema);
