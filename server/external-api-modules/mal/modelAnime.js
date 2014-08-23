var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var parser = require('./parser.js');

var malAnimeSchema = mongoose.Schema({
    id: Number,
    title: String,
    titles: [
        {title: String, lang: String}
    ],
    episodes: Number,
    status: String,
    start_date: Date,
    end_date: Date,
    description: String,
    img: String
});

malAnimeSchema.statics.findOrCreate = function (inputAnime, callback) {
    this.findOne({'id': inputAnime.id}, function (err, anime) {
        if (err) {
            return callback(err, null);
        }
        if (!anime) {
            anime = new malAnime();
        }
        parser.parseAnime(anime, inputAnime);
        return anime.save(callback);
    });
};

malAnimeSchema.plugin(timestamps);
var malAnime = mongoose.model('InfoMalAnime', malAnimeSchema);