var mongoose = require('mongoose');
var plugins = requireLib('mongoose-plugins.js');

var animeSchema = mongoose.Schema({
    title: {type: String, required: true},
    episode: {type: Number, min: 0, default: 0},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

animeSchema.plugin(plugins.dataModules);
mongoose.model('Anime', animeSchema);