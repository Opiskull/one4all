var mongoose = require('mongoose');
var plugins = requireLib('mongoose-plugins.js');

var serieSchema = mongoose.Schema({
    title: {type: String, required: true},
    season: {type: Number, min: 0, default: 0},
    episode: {type: Number, min: 0, default: 0},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

serieSchema.plugin(plugins.dataModules);
var model = mongoose.model('Serie', serieSchema);

module.exports = {
    Schema: serieSchema,
    Model: model
};