var mongoose = require('mongoose');
var Book = mongoose.model('Book');
var restHelper = requireLib('rest-helper.js');

module.exports = {
    title: 'Book',
    route: '/book',
    load: restHelper.load(Book),
    get: restHelper.get(Book),
    create: restHelper.create(Book),
    del: restHelper.del(Book),
    update: restHelper.update(Book),
    list: restHelper.list(Book)
};