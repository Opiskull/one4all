var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var stats = require('../lib/mongoose-plugins.js').stats;

var mangaSchema = mongoose.Schema({
    title: String,
    chapter: Number,
    url: String,
    titles: [
        {
            title: String,
            lang: String
        }
    ],
    user: {type:mongoose.Schema.Types.ObjectId, ref: 'User'}
});

mangaSchema.plugin(timestamps);
mangaSchema.plugin(stats);
mongoose.model('Manga', mangaSchema);