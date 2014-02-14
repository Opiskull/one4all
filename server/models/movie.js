var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');


var movieSchema = mongoose.Schema({
    title: String,
    finished: Boolean,
    dropped: Boolean,
    titles: [
        {
            title: String,
            lang: String
        }
    ],
    user: {type:mongoose.Schema.Types.ObjectId, ref: 'User'}
});

movieSchema.plugin(timestamps);
mongoose.model('Movie', movieSchema);