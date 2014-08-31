var mongoose = require('mongoose');
var plugins = rootRequire('lib/mongoose-plugins.js');

var animeSchema = mongoose.Schema({
    title: String,
    episode: Number,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

animeSchema.plugin(plugins.timestamps);
animeSchema.plugin(plugins.stats);
animeSchema.plugin(plugins.info);
animeSchema.plugin(plugins.rating);
animeSchema.plugin(plugins.tags);
mongoose.model('Anime', animeSchema);