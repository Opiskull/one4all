var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var stats = require('../lib/mongoose-plugins.js').stats;


var animeSchema = mongoose.Schema({
    title: String,
    episode: Number,
    titles: [
        {
            title: String,
            lang: String
        }
    ],
    user: {type:mongoose.Schema.Types.ObjectId, ref: 'User'}
});

animeSchema.plugin(timestamps);
animeSchema.plugin(stats);
mongoose.model('Anime', animeSchema);