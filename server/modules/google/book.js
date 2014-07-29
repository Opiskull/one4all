var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var parser = require('./parser.js');

var bookSchema = mongoose.Schema({
    id: String,
    title: String,
    authors: [String],
    publisher: String,
    published_date: Date,
    description: String,
    page_count: Number,
    img: String,
    isbn_13: String,
    isbn_10: String,
    language: String
});

bookSchema.statics.findOrCreate = function (inputBook, callback) {
    this.findOne({'id': inputBook.id}, function (err, book) {
        if (err) {
            return callback(err, null);
        }
        if (!book) {
            book = new googleBook();
        }
        parser.parseBook(book, inputBook);
        return book.save(callback);
    });
};

bookSchema.plugin(timestamps);
var googleBook = mongoose.model('InfoGoogleBook', bookSchema);