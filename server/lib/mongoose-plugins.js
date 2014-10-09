var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;
var User = mongoose.model('User');
var lodash = require('lodash');
var changesList = require('./changes-list.js');

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
    schema.add(infoSchema);
}

function ratingPlugin(schema) {
    var ratingSchema = {
        rating: {type: Number, min: 0, max: 5}
    };
    schema.add(ratingSchema);
}

function tagsPlugin(schema){
    var tagSchema = new mongoose.Schema({
        text: { type:String, lowercase: true, trim: true}
    },{_id: false});
    var tagsSchema = {
        tags: [tagSchema]
    };
    schema.add(tagsSchema);
}

function changesPlugin(schema){
    schema.post('save', function(doc){
        changesList.execute(doc.changes);
    });
    schema.post('remove', function (doc) {
        changesList.execute(doc.changes);
    });
}

function hiddenPlugin(schema) {
    schema.set('toJSON', {
        transform: function (doc, ret, options) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    });
}

module.exports.stats = statsPlugin;
module.exports.info = infoPlugin;
module.exports.rating = ratingPlugin;
module.exports.tags = tagsPlugin;
module.exports.timestamps = timestamps;
module.exports.hidden = hiddenPlugin;
module.exports.changes = changesPlugin;
module.exports.dataModules = function (schema) {
    schema.set('toJSON', {virtuals: true});
    schema.plugin(timestamps);
    schema.plugin(statsPlugin);
    schema.plugin(infoPlugin);
    schema.plugin(ratingPlugin);
    schema.plugin(tagsPlugin);
    schema.plugin(hiddenPlugin);
    schema.plugin(changesPlugin);
};