var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var MixtapeSchema = new Schema({
  title : String,
  description: String,
  tracks: Array,
  playlist_id: String
});
MixtapeSchema.plugin(timestamps);

module.exports = mongoose.model('Mixtape', MixtapeSchema);