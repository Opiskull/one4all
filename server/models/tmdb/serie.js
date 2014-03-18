var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var helper = require('./helper.js');

var tmdbSerieSchema = mongoose.Schema({
    id:Number,
    title:String,
    titles:[{title:String,lang:String}],
    first_air_date:Date,
    seasons:Number,
    episodes:Number,
    status:String,
    img:String
});

tmdbSerieSchema.statics.findOrCreate = function(inputSerie,callback){
    this.findOne({'id':inputSerie.id},function(err,serie){
        if(err){
            return callback(err,null);
        }
        if(serie){
            return callback(null,serie);
        }
        else{
            helper.parseTmdbObject(inputSerie,tmdbSerie,callback);
        }
    });
};

tmdbSerieSchema.plugin(timestamps);
var tmdbSerie = mongoose.model('cache_tmdb_serie', tmdbSerieSchema);