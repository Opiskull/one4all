var mongoose = require('mongoose');
var plugins = rootRequire('lib/mongoose-plugins.js');

var movieSchema = mongoose.Schema({
    title: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

movieSchema.plugin(plugins.timestamps);
movieSchema.plugin(plugins.stats);
movieSchema.plugin(plugins.info);
movieSchema.plugin(plugins.rating);
mongoose.model('Movie', movieSchema);