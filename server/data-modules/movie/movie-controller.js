var mongoose = require('mongoose');
var restify = require('restify');
var Movie = mongoose.model('Movie');

function load(req, res, next) {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        return next(new restify.ResourceNotFoundError("Movie with id " + req.params.id));
    }
    Movie.findOne({'_id': new mongoose.Types.ObjectId(req.params.id)}, function (err, movie) {
        if (err)
            return next(err);
        if (!movie)
            return next(new restify.ResourceNotFoundError("Movie with id " + req.params.id));
        req.model = movie;
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
    var movie = new Movie(req.params);
    movie.user = req.user._id;
    movie.save(function (err) {
            if (err)
                return next(err);
            res.json(movie);
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
    req.model.save(function (err, movie) {
        if (err)
            return next(err);
        res.json(movie);
        return next();
    });
}

function list(req, res, next) {
    Movie.find({user: new mongoose.Types.ObjectId(req.user.id)}, function (err, movies) {
        if (err)
            return next(err);
        res.json(movies);
        return next();
    });
}

module.exports = {
    title: 'Movie',
    route: '/movie',
    load: load,
    get: get,
    create: create,
    del: del,
    update: update,
    list: list
};