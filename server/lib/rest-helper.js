var mongoose = require('mongoose');
var restify = require('restify');
var eventManager = require('./event-manager.js');

/**
 * Load a model into req.model with the id from req.params.id
 * @param {mongoose.model} Model
 * @returns {Function} (req,res,next)
 */
function load(Model){
    return function(req,res,next) {
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return next(new restify.ResourceNotFoundError(Model.modelName + " with id " + req.params.id));
        }
        eventManager.emit(['item', 'load', 'before'], req.params.id);
        Model.findOne({'_id': new mongoose.Types.ObjectId(req.params.id)}, function (err, item) {
            if (err)
                return next(err);
            if (!item)
                return next(new restify.ResourceNotFoundError(Model.modelName + " with id " + req.params.id));
            eventManager.emit(['item', 'load', 'after']);
            req.model = item;
            return next();
        });
    }
}
/**
 * Get the req.model
 * @param {mongoose.model} Model
 * @returns {Function} (req,res,next)
 */
function get(Model){
    return function (req, res, next) {
        eventManager.emit(['item', 'get', 'before'], req);
        if (req.model) {
            eventManager.emit(['item', 'get', 'after']);
            res.json(req.model);
        }
        return next();
    }
}

/**
 * Create a new instance from the req.params
 * @param {mongoose.model} Model
 * @returns {Function} (req,res,next)
 */
function create(Model){
    return function(req,res,next) {
        var item = new Model(req.body);
        item.user = req.user._id;
        eventManager.emit(['item', 'create', 'before'], req, item);
        item.save(function (err, createdItem) {
                if (err)
                    return next(err);
                eventManager.emit(['item', 'create', 'after'], createdItem);
                res.json(item);
                return next();
            }
        );
    };
}
/**
 * Delete the model in req.model
 * @param {mongoose.model} Model
 * @returns {Function} (req,res,next)
 */
function del(Model){
    return function (req, res, next) {
        eventManager.emit(['item', 'delete', 'before'], req, req.model);
        req.model.remove(function (err) {
            if (err)
                return next(err);
            eventManager.emit(['item', 'delete', 'after'], req.model);
            res.send();
            return next();
        });
    }
}
/**
 * Update the model in req.model with the req.body
 * @param {mongoose.model} Model
 * @returns {Function}
 */
function update(Model){
    return function (req, res, next) {
        eventManager.emit(['item', 'update', 'before'], req, req.model);
        require('util')._extend(req.model, req.body);
        req.model.save(function (err, item) {
            if (err)
                return next(err);
            eventManager.emit(['item', 'update', 'after'], item);
            res.json(item);
            return next();
        });
    }
}
/**
 * List all models for this user
 * @param {mongoose.model} Model
 * @returns {Function}
 */
function list(Model) {
    return function (req, res, next) {
        eventManager.emit(['item', 'list', 'before']);
        Model.find({user: new mongoose.Types.ObjectId(req.user.id)}, function (err, items) {
            if (err)
                return next(err);
            eventManager.emit(['item', 'list', 'after'], items);
            res.json(items);
            return next();
        });
    }
}

module.exports = {
    load: load,
    get: get,
    create: create,
    del: del,
    update: update,
    list: list
};

