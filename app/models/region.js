// region model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var RegionSchema = new Schema({
  id: Number,
  name: String
});

RegionSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('Region', RegionSchema);
