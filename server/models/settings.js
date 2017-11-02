var mongoose = require('mongoose');

var settingSchema = new mongoose.Schema({
	logo: { type: String },
    maintenance: { type: Boolean }
	//created_at: { type: Date, default: Date.now },
	//updated_at: { type: Date, default: Date.now }
});

/*postSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  next();
});*/

module.exports = mongoose.model('Setting', settingSchema);