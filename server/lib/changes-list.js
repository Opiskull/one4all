var tagsHelper = require('./changes-tags.js');
var lodash = require('lodash');

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