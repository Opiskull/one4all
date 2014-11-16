var mongoose = require('mongoose');
var plugins = requireLib('mongoose-plugins.js');

var movieSchema = mongoose.Schema({
    title: {type: String, required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

movieSchema.plugin(plugins.dataModules);
var model = mongoose.model('Movie', movieSchema);

module.exports = {
    Schema: movieSchema,
    Model: model
};