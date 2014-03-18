var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var stats = require('../lib/mongoose-plugins.js').stats;

var gameSchema = mongoose.Schema({
    title: String,
    user: {type:mongoose.Schema.Types.ObjectId, ref: 'User'}
});

gameSchema.plugin(timestamps);
gameSchema.plugin(stats);
mongoose.model('Game', gameSchema);