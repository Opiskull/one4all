var mongoose = require('mongoose');
var plugins = requireLib('mongoose-plugins.js');

var mangaSchema = mongoose.Schema({
    title: {type: String, required: true},
    chapter: {type: Number, min: 0, default: 0},
    url: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

mangaSchema.plugin(plugins.timestamps);
mangaSchema.plugin(plugins.stats);
mangaSchema.plugin(plugins.info);
mangaSchema.plugin(plugins.rating);
mangaSchema.plugin(plugins.tags);
mangaSchema.plugin(plugins.hidden);
mangaSchema.plugin(plugins.changes);
mongoose.model('Manga', mangaSchema);