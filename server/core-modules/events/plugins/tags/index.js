var tagsHelper = require('./tags-helper.js');
var lodash = require('lodash');

module.exports.init = function (eventManager) {
    eventManager.on(['item', 'create', 'before'], function (req, dbitem) {
        dbitem.changes = tagsHelper.create(req.model, req.body, req.user);
    });

    eventManager.on(['item', 'delete', 'before'], function (req, dbitem) {
        dbitem.changes = tagsHelper.create(req.model, req.body, req.user);
    });

    eventManager.on(['item', 'update', 'before'], function (req, dbitem) {
        dbitem.changes = tagsHelper.create(req.model, req.body, req.user);
    });

    eventManager.on(['item', 'saved'], function (dbitem) {
        tagsHelper.execute(dbitem.changes);
    });

    eventManager.on(['item', 'removed'], function (dbitem) {
        tagsHelper.execute(dbitem.changes);
    });
};

