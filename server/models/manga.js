var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');


var mangaSchema = mongoose.Schema({
    title: String,
    chapter: Number,
    url: String,
    finished: Boolean,
    titles: [
        {
            title: String,
            lang: String
        }
    ]
});

mangaSchema.plugin(timestamps);
mongoose.model('Manga', mangaSchema);