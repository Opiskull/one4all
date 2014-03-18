var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var stats = require('../lib/mongoose-plugins.js').stats;

var serieSchema = mongoose.Schema({
    title: String,
    season: Number,
    episode: Number,
    user: {type:mongoose.Schema.Types.ObjectId, ref: 'User'}
});

serieSchema.plugin(timestamps);
serieSchema.plugin(stats);
mongoose.model('Serie', serieSchema);