var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');


var animeSchema = mongoose.Schema({
    title: String,
    episode: Number,
    finished: Boolean,
    titles: [
        {
            title: String,
            lang: String
        }
    ],
    user: {type:mongoose.Schema.Types.ObjectId, ref: 'User'}
});

animeSchema.plugin(timestamps);
mongoose.model('Anime', animeSchema);