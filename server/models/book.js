var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var stats = require('../lib/mongoose-plugins.js').stats;

var bookSchema = mongoose.Schema({
    title: String,
    page: Number,
    user: {type:mongoose.Schema.Types.ObjectId, ref: 'User'}
});

bookSchema.plugin(timestamps);
bookSchema.plugin(stats);
mongoose.model('Book', bookSchema);