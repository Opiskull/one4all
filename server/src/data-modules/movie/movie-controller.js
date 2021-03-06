var mongoose = require('mongoose');
var Movie = mongoose.model('Movie');
var restHelper = requireLib('rest-helper.js');

module.exports = {
    route: '/movie',
    load: restHelper.load(Movie),
    get: restHelper.get(Movie),
    create: restHelper.create(Movie),
    del: restHelper.del(Movie),
    update: restHelper.update(Movie),
    list: restHelper.list(Movie)
};