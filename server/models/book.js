var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');


var bookSchema = mongoose.Schema({
    title: String,
    finished: Boolean,
    dropped: Boolean,
    page: Number,
    titles: [
        {
            title: String,
            lang: String
        }
    ],
    user: {type:mongoose.Schema.Types.ObjectId, ref: 'User'}
});

bookSchema.plugin(timestamps);
mongoose.model('Book', bookSchema);