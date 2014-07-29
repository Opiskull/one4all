var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var plugins = require('../lib/mongoose-plugins.js');

var gameSchema = mongoose.Schema({
    title: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

gameSchema.plugin(timestamps);
gameSchema.plugin(plugins.stats);
gameSchema.plugin(plugins.info);
mongoose.model('Game', gameSchema);