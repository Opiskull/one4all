var mongoose = require('mongoose');
var plugins = requireLib('mongoose-plugins.js');

var bookSchema = mongoose.Schema({
    title: {type: String, required: true},
    page: {type: Number, min: 0, default: 0},
    author: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

bookSchema.plugin(plugins.dataModules);
mongoose.model('Book', bookSchema);