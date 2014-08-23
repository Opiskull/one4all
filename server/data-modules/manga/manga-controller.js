var mongoose = require('mongoose');
var restify = require('restify');
var Manga = mongoose.model('Manga');

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
    manga.user = req.user._id;
    manga.save(function (err) {
            if (err)
                return next(err);
            res.json(manga);
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
    require('util')._extend(req.model, req.body);
    req.model.save(function (err, manga) {
        if (err)
            return next(err);
        res.json(manga);
        return next();
    });
}

function list(req, res, next) {
    Manga.find({user: new mongoose.Types.ObjectId(req.user.id)}, function (err, mangas) {
        if (err)
            return next(err);
        res.json(mangas);
        return next();
    });
}

module.exports = {
    title: 'Manga',
    route: '/manga',
    load: load,
    get: get,
    create: create,
    del: del,
    update: update,
    list: list
};