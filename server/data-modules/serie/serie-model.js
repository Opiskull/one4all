var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var plugins = rootRequire('lib/mongoose-plugins.js');

var serieSchema = mongoose.Schema({
    title: String,
    season: Number,
    episode: Number,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

serieSchema.plugin(timestamps);
serieSchema.plugin(plugins.stats);
serieSchema.plugin(plugins.info);
serieSchema.plugin(plugins.rating);
mongoose.model('Serie', serieSchema);