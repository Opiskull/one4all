var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var plugins = require('../lib/mongoose-plugins.js');


var animeSchema = mongoose.Schema({
    title: String,
    episode: Number,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

animeSchema.plugin(timestamps);
animeSchema.plugin(plugins.stats);
animeSchema.plugin(plugins.info);
mongoose.model('Anime', animeSchema);