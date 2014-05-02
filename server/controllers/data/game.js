var mongoose = require('mongoose');
var restify = require('restify');
var Game = mongoose.model('Game');

module.exports.init = function (server,router) {
    var game = '/game';
    server.get(router.getRoute(game), router.isAuthenticated, list);
    server.post(router.getRoute(game), router.isAuthenticated, create);
    server.get(router.getRouteId(game),router.isAuthenticated, load, get);
    server.del(router.getRouteId(game),router.isAuthenticated, load, del);
    server.put(router.getRouteId(game),router.isAuthenticated, load, update);
};

function load(req, res, next) {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        return next(new restify.ResourceNotFoundError("Game with id " + req.params.id));
    }
    Game.findOne({'_id': new mongoose.Types.ObjectId(req.params.id)}, function (err, game) {
        if (err)
            return next(err);
        if (!game)
            return next(new restify.ResourceNotFoundError("Game with id " + req.params.id));
        req.model = game;
        return next();
    });
}

function get(req, res, next) {
    if (req.model) {
        res.json(req.model);
    }
    return next();
}

function create(req, res, next) {
    var game = new Game(req.params);
    game.user = req.user._id;
    game.save(function(err){
        if(err)
            return next(err);
        res.json(game);
        }
    );
}

function del(req, res, next) {
    req.model.remove(function (err) {
        if (err)
            return next(err);
        res.send();
        return next();
    });
}

function update(req, res, next) {
    require('util')._extend(req.model,req.body);
    req.model.save(function (err, game) {
        if (err)
            return next(err);
        res.json(game);
        return next();
    });
}

function list(req, res, next) {
    Game.find({user : new mongoose.Types.ObjectId(req.user.id)},function (err, games) {
        if (err)
            return next(err);
        res.json(games);
        return next();
    });
}