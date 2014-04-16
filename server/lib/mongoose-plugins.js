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
        info:{
            titles:[{title:String, lang:String}],
            description:String,
            img:String
        }
    };
    schema.add(infoSchema);
}

module.exports.stats = statsPlugin;
module.exports.info = infoPlugin;