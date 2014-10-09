var tagsHelper = require('./changes-tags.js');
var lodash = require('lodash');
var eventManager = require('./event-manager.js');

eventManager.on(['item', 'create', 'before'], function (req, dbitem) {
    dbitem.changes = createChangesFromRequest(req);
});

eventManager.on(['item', 'delete', 'before'], function (req, dbitem) {
    dbitem.changes = createChangesFromRequest(req);
});

eventManager.on(['item', 'update', 'before'], function (req, dbitem) {
    dbitem.changes = createChangesFromRequest(req);
});

function createChangesFromRequest(req){
    var changes = [];
    changes.push(tagsHelper.create(req.model, req.body, req.user));
    return changes;
}

function execute(changes){
    lodash.each(changes, function(change){
        if(change.changed)
            tagsHelper.execute(change);
    });
}

module.exports ={
    createChangesFromRequest: createChangesFromRequest,
    execute:execute
};