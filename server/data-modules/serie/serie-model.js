var mongoose = require('mongoose');
var plugins = rootRequire('lib/mongoose-plugins.js');

var serieSchema = mongoose.Schema({
    title: {type: String, required: true},
    season: {type: Number, min: 0, default: 0},
    episode: {type: Number, min: 0, default: 0},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

serieSchema.plugin(plugins.timestamps);
serieSchema.plugin(plugins.stats);
serieSchema.plugin(plugins.info);
serieSchema.plugin(plugins.rating);
serieSchema.plugin(plugins.tags);
serieSchema.plugin(plugins.hidden);
serieSchema.plugin(plugins.changes);
mongoose.model('Serie', serieSchema);