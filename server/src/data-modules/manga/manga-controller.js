var mongoose = require('mongoose');
var Manga = mongoose.model('Manga');
var restHelper = requireLib('rest-helper.js');

module.exports = {
    route: '/manga',
    load: restHelper.load(Manga),
    get: restHelper.get(Manga),
    create: restHelper.create(Manga),
    del: restHelper.del(Manga),
    update: restHelper.update(Manga),
    list: restHelper.list(Manga)
};