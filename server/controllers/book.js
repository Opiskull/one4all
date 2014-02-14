var mongoose = require('mongoose');
var restify = require('restify');
var Book = mongoose.model('Book');

module.exports.init = function (server,router) {
    var book = '/book';
    server.get(router.getRoute(book), router.isAuthenticated, list);
    server.post(router.getRoute(book), router.isAuthenticated, create);
    server.get(router.getRouteId(book),router.isAuthenticated, load, get);
    server.del(router.getRouteId(book),router.isAuthenticated, load, del);
    server.put(router.getRouteId(book),router.isAuthenticated, load, update);
};

function load(req, res, next) {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        return next(new restify.ResourceNotFoundError("Book with id " + req.params.id));
    }
    Book.findOne({'_id': new mongoose.Types.ObjectId(req.params.id)}, function (err, book) {
        if (err)
            return next(err);
        if (!book)
            return next(new restify.ResourceNotFoundError("Book with id " + req.params.id));
        req.model = book;
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
    var book = new Book(req.params);
    book.user = req.user._id;
    book.save(function(err){
        if(err)
            return next(err);
        res.json(book);
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
    req.model.save(function (err, book) {
        if (err)
            return next(err);
        res.json(book);
        return next();
    });
}

function list(req, res, next) {
    Book.find({user : new mongoose.Types.ObjectId(req.user.id)},function (err, books) {
        if (err)
            return next(err);
        res.json(books);
        return next();
    });
}