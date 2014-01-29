var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');


var serieSchema = mongoose.Schema({
    title: String,
    season: Number,
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

serieSchema.plugin(timestamps);
mongoose.model('Serie', serieSchema);