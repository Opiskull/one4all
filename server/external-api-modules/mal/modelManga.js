var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var parser = require('./parser.js');

var malMangaSchema = mongoose.Schema({
    id: Number,
    title: String,
    titles: [
        {title: String, lang: String}
    ],
    chapters: Number,
    volumes: Number,
    status: String,
    start_date: Date,
    end_date: Date,
    description: String,
    img: String
});

malMangaSchema.statics.findOrCreate = function (inputManga, callback) {
    this.findOne({'id': inputManga.id}, function (err, manga) {
        if (err) {
            return callback(err, null);
        }
        if (!manga) {
            manga = new malManga();
        }
        parser.parseManga(manga, inputManga);
        return manga.save(callback);
    });
};

malMangaSchema.plugin(timestamps);
var malManga = mongoose.model('InfoMalManga', malMangaSchema);