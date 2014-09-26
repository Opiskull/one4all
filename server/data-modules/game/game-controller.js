var mongoose = require('mongoose');
var Game = mongoose.model('Game');
var restHelper = requireLib('rest-helper.js');

module.exports = {
    title: 'Game',
    route: '/game',
    load: restHelper.load(Game),
    get: restHelper.get(Game),
    create: restHelper.create(Game),
    del: restHelper.del(Game),
    update: restHelper.update(Game),
    list: restHelper.list(Game)
};