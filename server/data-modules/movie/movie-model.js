var mongoose = require('mongoose');
var plugins = requireLib('mongoose-plugins.js');

var movieSchema = mongoose.Schema({
    title: {type: String, required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

movieSchema.plugin(plugins.timestamps);
movieSchema.plugin(plugins.stats);
movieSchema.plugin(plugins.info);
movieSchema.plugin(plugins.rating);
movieSchema.plugin(plugins.tags);
movieSchema.plugin(plugins.hidden);
movieSchema.plugin(plugins.changes);
mongoose.model('Movie', movieSchema);