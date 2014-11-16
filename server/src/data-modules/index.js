var modulesLoader = requireLib('modules-loader.js');
var events = requireCore('event');
var async = require('async');
var loadedModels = [];

var prepareForParallel = function (Model, UserId) {
    return function (callback) {
        events.emit(['item', 'list', 'before']);
        Model.findByUserId(UserId, function (err, items) {
            if (err)
                return callback(err);
            events.emit(['item', 'list', 'after'], items);
            return callback(null, {
                title: Model.modelName.toLowerCase(),
                items: items
            });
        });
    };
};

var getLoadedModelsForParallel = function (UserId) {
    var asyncLoadedModels = [];
    loadedModels.forEach(function (Model) {
        asyncLoadedModels.push(prepareForParallel(Model, UserId));
    });
    return asyncLoadedModels;
};

var parallelResultArrayToObject = function (modelItems) {
    var modelCollection = {};
    modelItems.forEach(function (modelItem) {
        modelCollection[modelItem.title] = modelItem.items;
    });
    return modelCollection;
};

var list = function (req, res, next) {
    async.parallel(getLoadedModelsForParallel(req.user.id), function (err, modelItems) {
        if (err) next(err);
        res.json(parallelResultArrayToObject(modelItems));
        next();
    });
};

module.exports.init = function (server, router) {
    modulesLoader.loadModulesFromPath(__dirname, function (module, moduleName) {
        module.init(server, router);
        loadedModels.push(module.model);
    });
    server.get(router.getRoute("/all"), router.isAuthenticated, list);
};