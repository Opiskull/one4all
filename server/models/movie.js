var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var plugins = require('../lib/mongoose-plugins.js');

var movieSchema = mongoose.Schema({
    title: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

movieSchema.plugin(timestamps);
movieSchema.plugin(plugins.stats);
movieSchema.plugin(plugins.info);
movieSchema.plugin(plugins.rating);
mongoose.model('Movie', movieSchema);