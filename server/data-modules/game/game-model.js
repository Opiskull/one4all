var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var plugins = rootRequire('lib/mongoose-plugins.js');

var gameSchema = mongoose.Schema({
    title: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

gameSchema.plugin(timestamps);
gameSchema.plugin(plugins.stats);
gameSchema.plugin(plugins.info);
gameSchema.plugin(plugins.rating);
mongoose.model('Game', gameSchema);