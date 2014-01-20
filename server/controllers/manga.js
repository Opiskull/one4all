var mongoose = require('mongoose');
var restify = require('restify');
var Manga = mongoose.model('Manga');

module.exports.init = function (server,router) {
    var manga = '/manga';
    server.get(router.getRoute(manga), router.isAuthenticated, list);
    server.post(router.getRoute(manga), create);
    server.get(router.getRouteId(manga), load, get);
    server.del(router.getRouteId(manga), load, del);
    server.put(router.getRouteId(manga), load, update);
};

function load(req, res, next) {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        return next(new restify.ResourceNotFoundError("Manga with id " + req.params.id));
    }
    Manga.findOne({'_id': new mongoose.Types.ObjectId(req.params.id)}, function (err, manga) {
        if (err)
            return next(err);
        if (!manga)
            return next(new restify.ResourceNotFoundError("Manga with id " + req.params.id));
        req.model = manga;
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
    var manga = new Manga(req.params);
    manga.save();
    res.json(manga);
    return next();
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
    //delete req.body._id;
    req.model.set(req.body);
    req.model.save(function (err, manga) {
        if (err)
            return next(err);
        res.json(manga);
        return next();
    });
}

function list(req, res, next) {
    Manga.find(function (err, mangas) {
        if (err)
            return next(err);
        res.json(mangas);
        return next();
    });
}