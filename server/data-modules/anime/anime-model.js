var mongoose = require('mongoose');
var plugins = rootRequire('lib/mongoose-plugins.js');

var animeSchema = mongoose.Schema({
    title: {type: String, required: true},
    episode: {type: Number, min: 0, default: 0},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

animeSchema.plugin(plugins.timestamps);
animeSchema.plugin(plugins.stats);
animeSchema.plugin(plugins.info);
animeSchema.plugin(plugins.rating);
animeSchema.plugin(plugins.tags);
animeSchema.plugin(plugins.hidden);
mongoose.model('Anime', animeSchema);