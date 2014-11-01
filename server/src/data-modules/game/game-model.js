var mongoose = require('mongoose');
var plugins = requireLib('mongoose-plugins.js');

var gameSchema = mongoose.Schema({
    title: {type: String, required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

gameSchema.plugin(plugins.dataModules);
mongoose.model('Game', gameSchema);