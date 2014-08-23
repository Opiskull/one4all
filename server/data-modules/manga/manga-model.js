var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var plugins = rootRequire('lib/mongoose-plugins.js');

var mangaSchema = mongoose.Schema({
    title: String,
    chapter: Number,
    url: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

mangaSchema.plugin(timestamps);
mangaSchema.plugin(plugins.stats);
mangaSchema.plugin(plugins.info);
mangaSchema.plugin(plugins.rating);
mongoose.model('Manga', mangaSchema);