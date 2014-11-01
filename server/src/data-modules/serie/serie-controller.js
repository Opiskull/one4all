var mongoose = require('mongoose');
var Serie = mongoose.model('Serie');
var restHelper = requireLib('rest-helper.js');

module.exports = {
    title: 'Serie',
    route: '/serie',
    load: restHelper.load(Serie),
    get: restHelper.get(Serie),
    create: restHelper.create(Serie),
    del: restHelper.del(Serie),
    update: restHelper.update(Serie),
    list: restHelper.list(Serie)
};