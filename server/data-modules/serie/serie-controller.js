var mongoose = require('mongoose');
var restify = require('restify');
var Serie = mongoose.model('Serie');

function load(req, res, next) {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        return next(new restify.ResourceNotFoundError("Serie with id " + req.params.id));
    }
    Serie.findOne({'_id': new mongoose.Types.ObjectId(req.params.id)}, function (err, serie) {
        if (err)
            return next(err);
        if (!serie)
            return next(new restify.ResourceNotFoundError("Serie with id " + req.params.id));
        req.model = serie;
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
    var serie = new Serie(req.params);
    serie.user = req.user._id;
    serie.save(function (err) {
            if (err)
                return next(err);
            res.json(serie);
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
    req.model.save(function (err, serie) {
        if (err)
            return next(err);
        res.json(serie);
        return next();
    });
}

function list(req, res, next) {
    Serie.find({user: new mongoose.Types.ObjectId(req.user.id)}, function (err, series) {
        if (err)
            return next(err);
        res.json(series);
        return next();
    });
}

module.exports = {
    title: 'Serie',
    route: '/serie',
    load: load,
    get: get,
    create: create,
    del: del,
    update: update,
    list: list
};