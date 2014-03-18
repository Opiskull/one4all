var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var stats = require('../lib/mongoose-plugins.js').stats;


var animeSchema = mongoose.Schema({
    title: String,
    episode: Number,
    user: {type:mongoose.Schema.Types.ObjectId, ref: 'User'}
});

animeSchema.plugin(timestamps);
animeSchema.plugin(stats);
mongoose.model('Anime', animeSchema);