var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');


var mangaSchema = mongoose.Schema({
    title: String,
    chapter: Number,
    url: String,
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

mangaSchema.plugin(timestamps);
mongoose.model('Manga', mangaSchema);