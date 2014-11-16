var mongoose = require('mongoose');
var Anime = mongoose.model('Anime');
var restHelper = requireLib('rest-helper.js');

module.exports = {
    route: '/anime',
    load: restHelper.load(Anime),
    get: restHelper.get(Anime),
    create: restHelper.create(Anime),
    del: restHelper.del(Anime),
    update: restHelper.update(Anime),
    list: restHelper.list(Anime)
};