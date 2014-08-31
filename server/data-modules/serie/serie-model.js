var mongoose = require('mongoose');
var plugins = rootRequire('lib/mongoose-plugins.js');

var serieSchema = mongoose.Schema({
    title: String,
    season: Number,
    episode: Number,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

serieSchema.plugin(plugins.timestamps);
serieSchema.plugin(plugins.stats);
serieSchema.plugin(plugins.info);
serieSchema.plugin(plugins.rating);
serieSchema.plugin(plugins.tags);
mongoose.model('Serie', serieSchema);