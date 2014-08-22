var mongoose = require('mongoose');
var Schema = mongoose.Schema;


function statsPlugin(schema) {
    var statsSchema = {
        stats: {
            finished: Boolean,
            dropped: Boolean,
            paused: Boolean,
            owned: Boolean
        }
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

function ratingPlugin(schema){
    var ratingSchema = {
        rating: { type: Number, min: 0, max: 5}
    };
    schema.add(ratingSchema);
}

module.exports.stats = statsPlugin;
module.exports.info = infoPlugin;
module.exports.rating = ratingPlugin;