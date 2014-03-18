var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var stats = require('../lib/mongoose-plugins.js').stats;

var movieSchema = mongoose.Schema({
    title: String,
    user: {type:mongoose.Schema.Types.ObjectId, ref: 'User'}
});

movieSchema.plugin(timestamps);
movieSchema.plugin(stats);
mongoose.model('Movie', movieSchema);