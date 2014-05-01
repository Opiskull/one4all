var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var plugins = require('../lib/mongoose-plugins.js');

var bookSchema = mongoose.Schema({
    title: String,
    page: Number,
    user: {type:mongoose.Schema.Types.ObjectId, ref: 'User'}
});

bookSchema.plugin(timestamps);
bookSchema.plugin(plugins.stats);
bookSchema.plugin(plugins.info);
mongoose.model('Book', bookSchema);