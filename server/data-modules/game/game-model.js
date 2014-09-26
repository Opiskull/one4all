var mongoose = require('mongoose');
var plugins = requireLib('mongoose-plugins.js');

var gameSchema = mongoose.Schema({
    title: {type: String, required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

gameSchema.plugin(plugins.timestamps);
gameSchema.plugin(plugins.stats);
gameSchema.plugin(plugins.info);
gameSchema.plugin(plugins.rating);
gameSchema.plugin(plugins.tags);
gameSchema.plugin(plugins.hidden);
gameSchema.plugin(plugins.changes);
mongoose.model('Game', gameSchema);