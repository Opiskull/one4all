var mongoose = require('mongoose');
var Schema = mongoose.Schema;


function statsPlugin(schema,options){
    var statsSchema = {
        stats:
        {
            finished: Boolean,
            dropped: Boolean
        }
    };
    schema.add(statsSchema);
}

function infoPlugin(schema, options){
    var infoSchema = {
        infos:[Schema.Types.Mixed]
    };
    schema.virtual('info').get(function(){
        var info = {};
        this.infos.forEach(function(element){
            if(element.default)
                info = element;
        });
        if(!info.id){
            return this.infos[0];
        }
        return info;
    });
    schema.set('toJSON', {
            virtuals:true
        });
    schema.set('toObject',{
        virtuals:true
    });
    schema.add(infoSchema);
}

module.exports.stats = statsPlugin;
module.exports.info = infoPlugin;