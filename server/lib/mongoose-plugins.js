var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var hidden = require('mongoose-hidden')();
var Schema = mongoose.Schema;

function statsPlugin(schema) {
    var statsSchema = {
        // empty for backward compatiblity
        state: {type: String,enum:["","finished","dropped","paused","owned"]}
    };
    schema.add(statsSchema);
}

function infoPlugin(schema) {
    var infoSchema = {
        infos: [Schema.Types.Mixed]
    };
    schema.virtual('info').get(function () {
        var info = {};
        this.infos.forEach(function (element) {
            if (element.default)
                info = element;
        });
        if (!info.id) {
            return this.infos[0];
        }
        return info;
    });
    schema.set('toJSON', {
        virtuals: true
    });
    schema.set('toObject', {
        virtuals: true
    });
    schema.add(infoSchema);
}

function ratingPlugin(schema) {
    var ratingSchema = {
        rating: {type: Number, min: 0, max: 5}
    };
    schema.add(ratingSchema);
}

function tagsPlugin(schema){
    var tagsSchema = {
        tags: [{text: String}]
    };
    schema.add(tagsSchema);
}

module.exports.stats = statsPlugin;
module.exports.info = infoPlugin;
module.exports.rating = ratingPlugin;
module.exports.tags = tagsPlugin;
module.exports.timestamps = timestamps;
module.exports.hidden = hidden;