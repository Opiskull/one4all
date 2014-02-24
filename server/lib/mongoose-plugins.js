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

module.exports.stats = statsPlugin;