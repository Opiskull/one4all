var mongoose = require('mongoose');
var plugins = requireLib('mongoose-plugins.js');

var mangaSchema = mongoose.Schema({
    title: {type: String, required: true},
    chapter: {type: Number, min: 0, default: 0},
    url: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

mangaSchema.plugin(plugins.dataModules);
var model = mongoose.model('Manga', mangaSchema);

module.exports = {
    Schema: mangaSchema,
    Model: model
};