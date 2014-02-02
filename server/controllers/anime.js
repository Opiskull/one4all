var mongoose = require('mongoose');
var restify = require('restify');
var Anime = mongoose.model('Anime');

module.exports.init = function (server,router) {
    var anime = '/anime';
    server.get(router.getRoute(anime), router.isAuthenticated, list);
    server.post(router.getRoute(anime), router.isAuthenticated, create);
    server.get(router.getRouteId(anime),router.isAuthenticated, load, get);
    server.del(router.getRouteId(anime),router.isAuthenticated, load, del);
    server.put(router.getRouteId(anime),router.isAuthenticated, load, update);
};

function load(req, res, next) {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        return next(new restify.ResourceNotFoundError("Anime with id " + req.params.id));
    }
    Anime.findOne({'_id': new mongoose.Types.ObjectId(req.params.id)}, function (err, anime) {
        if (err)
            return next(err);
        if (!anime)
            return next(new restify.ResourceNotFoundError("Anime with id " + req.params.id));
        req.model = anime;
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
    var anime = new Anime(req.params);
    anime.user = req.user._id;
    anime.save(function(err){
        if(err)
            return next(err);
        res.json(anime);
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
    req.model.set(req.body);
    req.model.save(function (err, anime) {
        if (err)
            return next(err);
        res.json(anime);
        return next();
    });
}

function list(req, res, next) {
    Anime.find({user : new mongoose.Types.ObjectId(req.user.id)},function (err, animes) {
        if (err)
            return next(err);
        res.json(animes);
        return next();
    });
}